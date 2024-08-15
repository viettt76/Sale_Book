import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderService } from '~/services/orderService';
import styles from './Order.module.scss';
import { Modal } from 'react-bootstrap';
import { submitReviewService } from '~/services/reviewService';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '~/redux/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { formatDateTime, formatPrice } from '~/utils/commonUtils';
import Loading from '~/components/Loading';
import BreadCrumb from '~/containers/BreadCrumb';
import bookImageDefault from '~/assets/imgs/book-default.jpg';

const Order = () => {
    const userInfo = useSelector(userInfoSelector);
    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const res = await getOrderService();
            const x = [];
            res?.data?.forEach((order) => {
                return order?.orderItems?.forEach((book) => {
                    return x.push({
                        orderId: order?.id,
                        date: order?.date,
                        status: order?.status,
                        totalAmount: order?.totalAmount,
                        voucherPercent: order?.voucherPercent,
                        bookId: book?.bookId,
                        bookImage: book?.bookImage,
                        bookName: book?.bookName,
                        bookPrice: book?.bookPrice,
                        quantity: book?.quantity,
                        isReviewed: book?.isReviewed,
                    });
                });
            });

            const y = [
                {
                    orderId: 8,
                    date: '2022-12-06T00:00:00',
                    status: 3,
                    totalAmount: 550000,
                    voucherPercent: 0,
                    bookId: 8,
                    bookImage:
                        'https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/z48398975736586899037cbeab4b8e.jpg?v=1705552513867',
                    bookName: 'THẾ GIỚI ATLANTIS',
                    bookPrice: 170000,
                    quantity: 2,
                    isReviewed: true,
                },
                {
                    orderId: 5,
                    date: '2022-12-11T00:00:00',
                    status: 2,
                    totalAmount: 400000,
                    voucherPercent: 0,
                    bookId: 5,
                    bookImage:
                        'https://product.hstatic.net/200000343865/product/8_54da49676c87420a82c7bc035bff2b7f_master.jpg',
                    bookName: 'Solo Leveling - Tôi thăng cấp một mình - Tập 8',
                    bookPrice: 50000,
                    quantity: 17,
                    isReviewed: false,
                },
                {
                    orderId: 6,
                    date: '2024-08-06T00:00:00',
                    status: 4,
                    totalAmount: 450000,
                    voucherPercent: 0,
                    bookId: 6,
                    bookImage:
                        'https://product.hstatic.net/200000343865/product/1_d295818bf0c54c01a64027f9c986b891_master.jpg',
                    bookName: 'Solo Leveling - Tôi thăng cấp một mình - Tập 1',
                    bookPrice: 79200,
                    quantity: 2,
                    isReviewed: false,
                },
                {
                    orderId: 9,
                    date: '2024-08-15T08:20:26.213628',
                    status: 1,
                    totalAmount: 600000,
                    voucherPercent: 0,
                    bookId: 9,
                    bookImage:
                        'https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/quancanhbohamcuakecapquakhuout.jpg?v=1710306261860',
                    bookName: 'QUÁN CANH BÒ HẦM CỦA KẺ CẮP QUÁ KHỨ',
                    bookPrice: 320000,
                    quantity: 3,
                    isReviewed: true,
                },
                {
                    orderId: 10,
                    date: '2024-08-15T08:20:26.2136284',
                    status: 0,
                    totalAmount: 650000,
                    voucherPercent: 0,
                    bookId: 10,
                    bookImage:
                        'https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/hoa-cho-algernon-phieu-bia.jpg?v=1712212030150',
                    bookName: 'Hoa trên mộ ALGERNON',
                    bookPrice: 175000,
                    quantity: 1,
                    isReviewed: true,
                },
                {
                    orderId: 11,
                    date: '2024-08-15T08:20:26.2136285',
                    status: 3,
                    totalAmount: 700000,
                    voucherPercent: 0,
                    bookId: 11,
                    bookImage:
                        'https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/haunhuvohai01.jpg?v=1705552102770',
                    bookName: 'HẦU NHƯ VÔ HẠI',
                    bookPrice: 200000,
                    quantity: 2,
                    isReviewed: false,
                },
                {
                    orderId: 12,
                    date: '2024-08-15T08:20:26.2136289',
                    status: 2,
                    totalAmount: 750000,
                    voucherPercent: 0,
                    bookId: 12,
                    bookImage:
                        'https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/sieuanmangnoiuuphiencuacacnhat.jpg?v=1713497760903',
                    bookName: 'SIÊU ÁN MẠNG: NỖI ƯU PHIỀN CỦA CÁC NHÀ VĂN TRINH THÁM',
                    bookPrice: 210000,
                    quantity: 3,
                    isReviewed: true,
                },
            ];

            setOrders(y);

            // setOrders(x);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const [showModalReview, setShowModalReview] = useState(false);
    const [currentBookReview, setCurrentBookReview] = useState(null);
    const [reviewRate, setReviewRate] = useState(0);
    const [reviewContent, setReviewContent] = useState('');

    const handleCloseModalReview = () => {
        setShowModalReview(false);
        setReviewContent('');
        setReviewRate(0);
    };
    const handleShowModalReview = (bookInfo) => {
        setShowModalReview(true);
        setCurrentBookReview({
            orderId: bookInfo?.orderId,
            bookId: bookInfo?.bookId,
            bookImage: bookInfo?.bookImage,
            bookName: bookInfo?.bookName,
        });
    };
    const handleReview = async () => {
        try {
            await submitReviewService({
                date: new Date().toISOString(),
                content: reviewContent,
                userId: userInfo?.id,
                rate: reviewRate,
                bookId: currentBookReview?.bookId,
                orderId: currentBookReview?.orderId,
            });
            fetchOrder();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalReview();
        }
    };

    return (
        <>
            {loading ? (
                <Loading className="mt-3" />
            ) : (
                <div className={clsx(styles['overlay'])}>
                    <div className={clsx('container', styles['order-wrapper'])}>
                        <BreadCrumb title="Your order" item="Order" />

                        {orders?.map((order) => {
                            const obj = {
                                0: 'Đã huỷ',
                                1: 'Đã thanh toán',
                                2: 'Chưa thanh toán',
                                3: 'Đã giao hàng',
                                4: 'Đang xử lý',
                            };

                            return (
                                <div key={`order-${order?.orderId}`} className={clsx(styles['order-item'])}>
                                    <div className={clsx(styles['order-status'])}>{obj[order?.status]}</div>
                                    <div className={clsx(styles['order-book-info'])}>
                                        <div className={clsx(styles['order-book-img'])}>
                                            <img
                                                src={order?.bookImage}
                                                alt={order?.bookName || bookImageDefault}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = bookImageDefault;
                                                }}
                                            />
                                        </div>
                                        <div className={clsx(styles['order-book-name-quantity'])}>
                                            <h5 className={clsx(styles['order-book-name'])}>{order?.bookName}</h5>
                                            <div className={clsx(styles['order-book-quantity'])}>
                                                Số lượng: x {order?.quantity}
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="fz-16 me-2">Giá: </span>
                                            <span className={clsx(styles['order-book-price'])}>
                                                {formatPrice(order?.bookPrice, 'VND')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={clsx(styles['order-footer'])}>
                                        <div className={clsx(styles['order-date'])}>
                                            Ngày mua: {formatDateTime(order?.date)}
                                        </div>
                                        <div className="d-flex flex-column align-items-end">
                                            <div className={clsx(styles['order-total-amount'])}>
                                                Thành tiền: {formatPrice(order?.totalAmount, 'VND')}
                                            </div>
                                            {order?.status === 3 && (
                                                <div className={clsx(styles['order-action'])}>
                                                    {!order?.isReviewed && (
                                                        <button
                                                            className={clsx(styles['order-review'])}
                                                            onClick={() =>
                                                                handleShowModalReview({
                                                                    orderId: order?.orderId,
                                                                    bookId: order?.bookId,
                                                                    bookImage: order?.bookImage,
                                                                    bookName: order?.bookName,
                                                                })
                                                            }
                                                        >
                                                            Đánh giá
                                                        </button>
                                                    )}

                                                    <Link
                                                        to={`/book/${order?.bookId}/pay?quantity=1`}
                                                        className={clsx(
                                                            {
                                                                ['d-block']: order?.isReviewed,
                                                            },
                                                            styles['order-buy-back'],
                                                        )}
                                                    >
                                                        Mua lại
                                                    </Link>
                                                </div>
                                            )}
                                            {order?.status === 0 && (
                                                <div className={clsx(styles['order-action'])}>
                                                    <Link
                                                        to={`/book/${order?.bookId}`}
                                                        className={clsx('d-block', styles['order-buy-back'])}
                                                    >
                                                        Mua lại
                                                    </Link>
                                                </div>
                                            )}
                                            {(order?.status === 4 || order?.status === 2) && (
                                                <div className={clsx('d-flex', styles['order-action'])}>
                                                    <button className={clsx('d-block', styles['cancel-order'])}>
                                                        Huỷ đơn
                                                    </button>
                                                    {order?.status === 2 && (
                                                        <Link
                                                            to={`/book/${order?.bookId}/pay?quantity=${order?.quantity}`}
                                                            className={clsx('d-block ms-3', styles['order-buy-back'])}
                                                        >
                                                            Thanh toán
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Modal
                        className={clsx(styles['modal-review'])}
                        show={showModalReview}
                        onHide={handleCloseModalReview}
                    >
                        <Modal.Header className={clsx(styles['review-header'])} closeButton>
                            <Modal.Title className={clsx(styles['review-title'])}>Đánh giá</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={clsx(styles['review-body'])}>
                            <div className="d-flex">
                                <img
                                    className={clsx(styles['book-review-image'])}
                                    src={currentBookReview?.bookImage}
                                    alt={currentBookReview?.bookName}
                                />

                                <h6 className={clsx(styles['book-review-name'])}>{currentBookReview?.bookName}</h6>
                            </div>
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
                                    required
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                disabled={reviewRate <= 0 || reviewContent === ''}
                                className="btn btn-primary fz-16"
                                onClick={handleReview}
                            >
                                Gửi đánh giá
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default Order;
