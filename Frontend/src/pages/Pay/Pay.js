import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Payment.module.scss';
import avatar from '~/assets/imgs/avatar-default.png';
import { formatPrice, totalPayment } from '~/utils/commonUtils';
import { Modal } from 'react-bootstrap';

const Pay = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const quantityParam = queryParams.get('quantity');

    const [quantity, setQuantity] = useState(Number(quantityParam));

    const [bookInfo, setBookInfo] = useState({
        id: 'abc',
        name: 'The Great Gatsby',
        genres: [1],
        price: '200000',
        description: 'A classic novel of the Roaring Twenties.',
        publicationDate: 'April 10, 1925',
        totalPageNumber: '180',
        rated: '4.5/5',
        remaining: 20,
        image: avatar,
    });

    const handleSetQuantity = (e) => {
        if (!isNaN(e.target.value)) {
            setQuantity(e.target.value);
        }
    };

    const [showVoucher, setShowVoucher] = useState(false);
    const [vouchers, setVouchers] = useState([
        {
            id: 'voucher-1',
            percent: 20,
        },
        {
            id: 'voucher-2',
            percent: 40,
        },
        {
            id: 'voucher-3',
            percent: 50,
        },
    ]);
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

    return (
        <div className={clsx(styles['overlay'])}>
            <div className={clsx(styles['pay-wrapper'])}>
                <div className={clsx(styles['book-info'])}>
                    <img className={clsx(styles['book-image'])} src={bookInfo?.image} />
                    <div>
                        <h6 className={clsx(styles['book-name'])}>{bookInfo?.name}</h6>
                        <div className={clsx(styles['book-price'])}>{bookInfo?.price}</div>
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
                            {vouchers?.map((voucher) => {
                                return (
                                    <div
                                        key={`voucher-${voucher?.id}`}
                                        className={clsx(styles['voucher-item'])}
                                        onClick={() => handleAddVoucher(voucher)}
                                    >
                                        Giảm giá {voucher?.percent}%
                                    </div>
                                );
                            })}
                        </Modal.Body>
                    </Modal>
                </div>
                <div className={clsx(styles['total-payment'])}>Tổng tiền: {formatPrice(totalPay, 'VND')}</div>
                <button className={clsx(styles['btn-pay'])}>Thanh toán</button>
            </div>
        </div>
    );
};

export default Pay;
