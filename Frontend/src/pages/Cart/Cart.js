import clsx from 'clsx';
import styles from './Cart.module.scss';
import { formatPrice, totalPayment } from '~/utils/commonUtils';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { getCartService, updateBookQuantityInCartService } from '~/services/cartService';

const Cart = () => {
    const [cart, setCart] = useState([]);

    const fetchGetCart = async () => {
        try {
            const res = await getCartService();
            setCart(res?.data?.cartItems);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchGetCart();
    }, []);

    const [checkedBook, setCheckedBook] = useState([]);
    const [totalPay, setTotalPay] = useState(0);

    const handleCheck = (bookId) => {
        setCheckedBook((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]));
    };

    const changeQuantity = async (cartId, bookId, quantity) => {
        try {
            await updateBookQuantityInCartService({ cartId, bookId, quantity });
            fetchGetCart();
        } catch (error) {
            console.log(error);
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

    useEffect(() => {
        const total = checkedBook?.reduce((acc, bookId) => {
            const book = cart.find((b) => b.id === bookId);
            return acc + book.price * book.quantity;
        }, 0);
        setTotalPay(() =>
            voucherSelected ? totalPayment(total, { type: '%', value: voucherSelected?.percent }) : total,
        );
    }, [checkedBook, cart, voucherSelected]);

    const handleShowVoucher = () => setShowVoucher(true);
    const handleCloseVoucher = () => setShowVoucher(false);

    const handleAddVoucher = (voucher) => {
        setVoucherSelected(voucher);
        handleCloseVoucher();
    };

    return (
        <div className={clsx(styles['overlay'])}>
            <div className={clsx(styles['pay-wrapper'])}>
                <div className={clsx(styles['books-wrapper'])}>
                    {cart?.map((book) => {
                        return (
                            <div className={clsx(styles['book-wrapper'])} key={`book-${book?.bookId}`}>
                                <div className={clsx(styles['action'])}>
                                    <input
                                        className={clsx(styles['check'])}
                                        type="checkbox"
                                        checked={checkedBook?.includes(book?.bookId)}
                                        onChange={() => handleCheck(book?.bookId)}
                                    />
                                    <button className={clsx(styles['delete'])}>Xoá</button>
                                </div>
                                <div className={clsx(styles['book-info'])}>
                                    <img className={clsx(styles['book-image'])} src={book?.bookImage} />
                                    <div>
                                        <h6 className={clsx(styles['book-name'])}>{book?.bookName}</h6>
                                        <div className={clsx(styles['book-price'])}>{book?.bookPrice}</div>
                                        <div className={clsx(styles['book-quantity'])}>
                                            <button
                                                className={clsx(styles['book-quantity-btn'])}
                                                disabled={book?.quantity <= 1}
                                                onClick={() =>
                                                    changeQuantity(book?.cartId, book?.bookId, book?.quantity - 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <input
                                                value={book?.quantity}
                                                onChange={(e) =>
                                                    changeQuantity(book?.cartId, book?.bookId, e.target.value)
                                                }
                                                className={clsx(styles['book-quantity-input'])}
                                            />
                                            <button
                                                className={clsx(styles['book-quantity-btn'])}
                                                onClick={() =>
                                                    changeQuantity(book?.cartId, book?.bookId, book?.quantity + 1)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={clsx(styles['payment-footer'])}>
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
        </div>
    );
};

export default Cart;
