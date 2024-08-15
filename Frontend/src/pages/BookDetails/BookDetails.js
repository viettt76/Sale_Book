import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { faStarHalfStroke, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import avatarDefault from '~/assets/imgs/avatar-default.png';
import styles from './BookDetails.module.scss';
import { formatPrice } from '~/utils/commonUtils';
import { getBookByIdService } from '~/services/bookService';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '~/redux/selectors';
import { addToCartService } from '~/services/cartService';
import customToastify from '~/utils/customToastify';
import Loading from '~/components/Loading';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const userInfo = useSelector(userInfoSelector);

    const [quantity, setQuantity] = useState(1);

    const [bookInfo, setBookInfo] = useState({
        name: '',
        description: '',
        image: '',
        price: 0,
        totalPageNumber: '',
        rated: '',
        bookGroupId: '',
        bookGroupName: '',
        publishedAt: '',
        authors: [],
        reviews: [],
        numberOfReview: 0,
    });

    const fetchGetBookById = async () => {
        try {
            setLoading(true);
            const res = await getBookByIdService(id);
            console.log(res);
            if (res?.data) {
                setBookInfo({
                    name: res.data?.title,
                    description: res.data?.description,
                    image: res.data?.image,
                    price: res.data?.price,
                    totalPageNumber: res.data?.totalPageNumber,
                    rated: res.data?.rate,
                    bookGroupId: res.data?.bookGroupId,
                    bookGroupName: res.data?.bookGroupName,
                    publishedAt: res.data?.publishedAt,
                    authors: res.data?.author?.map((a) => a?.fullName).join(', '),
                    reviews: res.data?.reviews,
                    numberOfReview: res?.data?.totalReviewNumber,
                });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            navigate('/404');
        }
    };

    useEffect(() => {
        fetchGetBookById();
    }, [id]);

    const handleSetQuantity = (e) => {
        if (!isNaN(e.target.value)) {
            setQuantity(e.target.value);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCartService({ cartId: userInfo?.cartId, bookId: id, quantity });
            customToastify.success('Thêm vào giỏ hàng thành công');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {loading ? (
                <Loading className="mt-3" />
            ) : (
                <Container className="mt-3">
                    <div>
                        <div className="row">
                            <div className="col-5">
                                <img className={clsx(styles['book-img'])} src={bookInfo?.image} />
                            </div>
                            <div className={clsx('col-7', styles['buy-book'])}>
                                <h3 className={clsx(styles['book-name'])}>{bookInfo?.name}</h3>
                                <div className={clsx(styles['rated-number-of-reviews'])}>
                                    <div className={clsx(styles['book-rated'])}>
                                        <div className={clsx(styles['number-of-rates'])}>{bookInfo?.rated}</div>
                                        {[...Array(Math.floor(bookInfo?.rated)).keys()].map((i) => (
                                            <FontAwesomeIcon key={`number-of-rates-${i}`} icon={faStarSolid} />
                                        ))}
                                        {bookInfo?.rated > Math.floor(bookInfo?.rated) && (
                                            <FontAwesomeIcon icon={faStarHalfStroke} />
                                        )}
                                        {[...Array(5 - Math.ceil(bookInfo?.rated)).keys()].map((i) => (
                                            <FontAwesomeIcon key={`number-of-rates-reject-${i}`} icon={faStarRegular} />
                                        ))}
                                    </div>
                                    <div className={clsx(styles['number-of-reviews'])}>
                                        {bookInfo?.numberOfReview || 0} đánh giá
                                    </div>
                                </div>
                                <div className={clsx(styles['book-authors'])}>Tác giả: {bookInfo?.authors}</div>
                                <div className={clsx(styles['book-other-info'])}>
                                    <div>Tổng số trang: {bookInfo?.totalPageNumber}</div>
                                    <div>Ngày xuất bản: {moment(bookInfo?.publishedAt).format('DD/MM/YYYY')}</div>
                                </div>
                                <div className={clsx(styles['book-price'])}>
                                    {formatPrice(bookInfo?.price * quantity, 'VND')}
                                </div>
                                <div className={clsx(styles['book-quantity'])}>
                                    <button
                                        className={clsx(styles['book-quantity-btn'])}
                                        disabled={quantity <= 1}
                                        onClick={() => setQuantity((prev) => prev - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        value={quantity}
                                        onChange={handleSetQuantity}
                                        className={clsx(styles['book-quantity-input'])}
                                    />
                                    <button
                                        className={clsx(styles['book-quantity-btn'])}
                                        onClick={() => setQuantity((prev) => prev + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className={clsx(styles['btn'], styles['btn-cart'])}
                                        onClick={handleAddToCart}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button
                                        className={clsx(styles['btn'], styles['btn-buy-now'])}
                                        onClick={() => {
                                            navigate(`/book/${id}/pay?quantity=${quantity}`);
                                        }}
                                    >
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles['book-introduction'])}>
                            <h6 className={clsx(styles['book-introduction-title'])}>Giới thiệu sách</h6>
                            <div className={clsx(styles['intro-tab-content'])}>{bookInfo?.description}</div>
                        </div>
                    </div>
                    <div className={clsx(styles['comment-list'])}>
                        <div className={clsx(styles['comment-list-title'])}>Đánh giá</div>
                        {bookInfo?.reviews?.map((review) => {
                            const s = review?.userName?.split('@')[0]
                                ? review?.userName?.split('@')[0]
                                : review?.userName;
                            const usernameDisplay = s.slice(0, 2) + '***' + s.slice(5);
                            return (
                                <div key={`review-${review?.id}`} className={clsx(styles['comment'])}>
                                    <div className={clsx(styles['comment-avatar-date'])}>
                                        <img className={clsx(styles['commentator-avatar'])} src={avatarDefault} />
                                        <div className={clsx(styles['comment-date'])}>
                                            {moment(review?.date).format('DD/MM/YYYY')}
                                        </div>
                                    </div>
                                    <div className={clsx(styles['comment-info-wrapper'])}>
                                        <div className={clsx(styles['commentator-name-comment-content'])}>
                                            <div className={clsx(styles['commentator-name'])}>{usernameDisplay}</div>
                                            <div className={clsx(styles['comment-content'])}>{review?.content}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            )}
        </>
    );
};

export default BookDetails;
