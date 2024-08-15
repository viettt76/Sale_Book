import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Payment.module.scss';
import avatar from '~/assets/imgs/avatar-default.png';
import { formatPrice, totalPayment } from '~/utils/commonUtils';
import { Modal } from 'react-bootstrap';
import { getBookByIdService } from '~/services/bookService';
import { getMyVoucherService } from '~/services/voucherService';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '~/redux/selectors';
import { orderService } from '~/services/orderService';
import Loading from '~/components/Loading';
import bookImageDefault from '~/assets/imgs/book-default.jpg';

const Pay = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const quantityParam = queryParams.get('quantity');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const userInfo = useSelector(userInfoSelector);

    const [quantity, setQuantity] = useState(Number(quantityParam));

    const [bookInfo, setBookInfo] = useState(null);

    useEffect(() => {
        const fetchGetBookInfo = async () => {
            try {
                setLoading(true);
                const res = await getBookByIdService(id);
                setBookInfo({
                    name: res?.data?.title,
                    price: res?.data?.price,
                    image: res?.data?.image,
                });
                setLoading(false);
            } catch (error) {
                console.log(error);
                navigate('/404');
            }
        };
        fetchGetBookInfo();
    }, [id]);

    const handleSetQuantity = (e) => {
        if (!isNaN(e.target.value) && e.target.value > 0 && e.target.value <= 50) {
            setQuantity(e.target.value);
        }
    };

    const [showVoucher, setShowVoucher] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const res = await getMyVoucherService();
                setVouchers(res?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchVoucher();
    }, []);
    const [voucherSelected, setVoucherSelected] = useState(null);

    const handleShowVoucher = () => setShowVoucher(true);
    const handleCloseVoucher = () => setShowVoucher(false);

    const handleAddVoucher = (voucher) => {
        setVoucherSelected(voucher);
        handleCloseVoucher();
    };

    const [totalPay, setTotalPay] = useState(0);

    useEffect(() => {
        setTotalPay(() =>
            voucherSelected
                ? totalPayment(bookInfo?.price * quantity, { type: '%', value: voucherSelected?.percent })
                : bookInfo?.price * quantity,
        );
    }, [voucherSelected, bookInfo, quantity]);

    const handlePay = async () => {
        try {
            await orderService({
                userId: userInfo?.id,
                voucherId: voucherSelected ? voucherSelected?.voucherId : 0,
                orderList: [{ bookId: id, quantity: quantity }],
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={clsx(styles['overlay'])}>
            {loading ? (
                <Loading className="mt-3" />
            ) : (
                <div className={clsx(styles['pay-wrapper'])}>
                    <div className={clsx(styles['book-info'])}>
                        <img
                            className={clsx(styles['book-image'])}
                            src={bookInfo?.image || bookImageDefault}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = bookImageDefault;
                            }}
                        />
                        <div>
                            <h6 className={clsx(styles['book-name'])}>{bookInfo?.name}</h6>
                            <div className={clsx(styles['book-price'])}>{bookInfo?.price}</div>
                            <div className={clsx(styles['book-quantity'])}>
                                <button
                                    className={clsx(styles['book-quantity-btn'])}
                                    disabled={quantity <= 1}
                                    onClick={() => setQuantity((prev) => Number(prev) - 1)}
                                >
                                    -
                                </button>
                                <input
                                    value={quantity}
                                    type="number"
                                    onChange={handleSetQuantity}
                                    className={clsx(styles['book-quantity-input'])}
                                    min={1}
                                    max={50}
                                />
                                <button
                                    disabled={quantity >= 50}
                                    className={clsx(styles['book-quantity-btn'])}
                                    onClick={() => setQuantity((prev) => Number(prev) + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles['voucher-wrapper'])}>
                        <div>Mã giảm giá:</div>
                        <div className={clsx(styles['voucher-value'])} onClick={handleShowVoucher}>
                            {voucherSelected ? `Mã giảm giá ${voucherSelected?.percent}%` : 'Chọn mã giảm giá'}
                        </div>
                        <Modal show={showVoucher} onHide={handleCloseVoucher}>
                            <Modal.Header className="fz-16" closeButton>
                                <Modal.Title className={clsx(styles['fz-24'])}>Chọn voucher</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {vouchers?.length > 0 ? (
                                    vouchers?.map((voucher) => {
                                        return (
                                            <div
                                                key={`voucher-${voucher?.id}`}
                                                className={clsx(styles['voucher-item'])}
                                                onClick={() => handleAddVoucher(voucher)}
                                            >
                                                Giảm giá {voucher?.percent}%
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center fz-16">Bạn không có voucher nào</div>
                                )}
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className={clsx(styles['total-payment'])}>Tổng tiền: {formatPrice(totalPay, 'VND')}</div>
                    <button className={clsx(styles['btn-pay'])} onClick={handlePay}>
                        Thanh toán
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pay;
