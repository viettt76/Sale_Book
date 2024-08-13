import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Modal, Tab, Tabs } from 'react-bootstrap';
import { faStarHalfStroke, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import avatarDefault from '~/assets/imgs/avatar-default.png';
import styles from './BookDetails.module.scss';
import { formatPrice } from '~/utils/commonUtils';
import { getBookByIdService } from '~/services/bookService';
import moment from 'moment';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

    const [showModalReview, setShowModalReview] = useState(false);
    const [reviewRate, setReviewRate] = useState(0);
    const [reviewContent, setReviewContent] = useState('');

    const handleCloseModalReview = () => setShowModalReview(false);
    const handleShowModalReview = () => setShowModalReview(true);

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
        authorName: [],
        reviews: [],
        numberOfReview: 0,
    });

    useEffect(() => {
        const fetchGetBookById = async () => {
            try {
                const res = await getBookByIdService(id);
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
                        authorName: res.data?.authorName,
                        reviews: res.data?.reviews,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchGetBookById();
    }, [id]);

    const handleSetQuantity = (e) => {
        if (!isNaN(e.target.value)) {
            setQuantity(e.target.value);
        }
    };

    return (
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
                            <button className={clsx(styles['btn'], styles['btn-cart'])}>Thêm vào giỏ hàng</button>
                            <button
                                className={clsx(styles['btn'], styles['btn-buy-now'])}
                                onClick={() => {
                                    navigate(`/book/${id}/pay?quantity=${quantity}`);
                                }}
                            >
                                Mua ngay
                            </button>
                        </div>
                        <button className={clsx(styles['btn'], styles['btn-reviews'])} onClick={handleShowModalReview}>
                            Đánh giá
                        </button>
                        <Modal
                            className={clsx(styles['modal-review'])}
                            show={showModalReview}
                            onHide={handleCloseModalReview}
                        >
                            <Modal.Header className={clsx(styles['review-header'])} closeButton>
                                <Modal.Title className={clsx(styles['review-title'])}>Đánh giá</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={clsx(styles['review-body'])}>
                                <div className={clsx(styles['review-rated'])}>
                                    {[...Array(reviewRate).keys()].map((i) => (
                                        <FontAwesomeIcon
                                            className={clsx(styles['active'])}
                                            key={`review-rated-${i}`}
                                            icon={faStarSolid}
                                            onClick={() => setReviewRate(i + 1)}
                                        />
                                    ))}
                                    {[...Array(5 - reviewRate).keys()].map((i) => (
                                        <FontAwesomeIcon
                                            key={`review-rated-reject-${i}`}
                                            icon={faStarRegular}
                                            onClick={() => setReviewRate((prev) => prev + i + 1)}
                                        />
                                    ))}
                                </div>
                                <div className={clsx(styles['review-content'])}>
                                    <input
                                        value={reviewContent}
                                        className="form-control"
                                        placeholder="Viết đánh giá"
                                        onChange={(e) => setReviewContent(e.target.value)}
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button disabled={reviewRate <= 0} className="btn btn-primary fz-16">
                                    Gửi đánh giá
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className={clsx(styles['book-introduction'])}>
                    <h6 className={clsx(styles['book-introduction-title'])}>Giới thiệu sách</h6>
                    <Tabs defaultActiveKey="describe" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="describe" title="Mô tả sách">
                            <div className={clsx(styles['intro-tab-content'])}>{bookInfo?.description}</div>
                        </Tab>
                        <Tab eventKey="author" title="Tác giả">
                            <div className={clsx(styles['intro-tab-content'])}>{bookInfo?.authorName?.join(', ')}</div>
                        </Tab>
                        <Tab eventKey="other-info" title="Thông tin khác">
                            <div className={clsx(styles['intro-tab-content'])}>
                                <div>Tổng số trang: {bookInfo?.totalPageNumber}</div>
                                <div>Ngày xuất bản: {moment(bookInfo?.publishedAt).format('DD/MM/YYYY')}</div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </Container>
    );
};

export default BookDetails;
