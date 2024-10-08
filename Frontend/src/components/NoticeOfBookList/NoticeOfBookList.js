import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './NoticeOfBookList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPrice } from '~/utils/commonUtils';
import { getCartService } from '~/services/cartService';
import { getOrderService } from '~/services/orderService';
import Loading from '~/components/Loading';

const NoticeOfBookList = ({
    title,
    icon,
    type,
    textLinkWhenNotEmpty,
    linkWhenNotEmpty,
    textWhenEmpty,
    textLinkWhenEmpty,
    linkWhenEmpty,
}) => {
    const [bookList, setBookList] = useState([]);
    const [showBookList, setShowBookList] = useState(false);
    const [loading, setLoading] = useState(false);

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowBookList(false);
        }
    };

    useEffect(() => {
        const fetchBookList = async () => {
            if (type === 'cart') {
                try {
                    setLoading(true);
                    const res = await getCartService();
                    setBookList(
                        res?.data?.cartItems
                            ?.map((c) => {
                                return {
                                    id: c?.bookId,
                                    name: c?.bookName,
                                    img: c?.bookImage,
                                    price: c?.bookPrice,
                                    quantity: c?.quantity,
                                };
                            })
                            .reverse(),
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            } else if (type === 'order') {
                try {
                    setLoading(true);
                    const res = await getOrderService();
                    const x = [];
                    res?.data?.forEach((order) => {
                        return order?.orderItems?.forEach((book) => {
                            return x.push(book);
                        });
                    });
                    setBookList(
                        x
                            ?.map((c) => {
                                return {
                                    id: c?.bookId,
                                    name: c?.bookName,
                                    img: c?.bookImage,
                                    price: c?.bookPrice,
                                    quantity: c?.quantity,
                                };
                            })
                            .reverse(),
                    );
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBookList();
    }, [type, showBookList]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={ref} className={clsx(styles['wrapper'])}>
            <FontAwesomeIcon
                onClick={() => setShowBookList(!showBookList)}
                className={clsx(styles['icon'])}
                icon={icon}
            />
            {bookList?.length > 0 ? (
                <div>
                    <ListGroup
                        className={clsx(styles['group-books'], {
                            [styles['show-group-books']]: showBookList,
                        })}
                    >
                        <h5 className={clsx(styles['title'])}>{title}</h5>
                        <div className={clsx(styles['books'])}>
                            {loading ? (
                                <Loading />
                            ) : (
                                bookList?.map((item, index) => {
                                    return (
                                        <ListGroup.Item key={`book-${index}`}>
                                            <Link
                                                onClick={() => setShowBookList(false)}
                                                className={clsx(styles['book'])}
                                                to={type === 'cart' ? `/book/${item?.id}` : '/order'}
                                            >
                                                <img
                                                    className={clsx(styles['book-img'])}
                                                    src={item?.img}
                                                    alt={item?.name}
                                                />
                                                <div>
                                                    <h5 className={clsx(styles['book-name'])}>{item?.name}</h5>
                                                    <div className="d-flex align-items-center">
                                                        <span className={clsx(styles['book-price'])}>
                                                            {formatPrice(item?.price, 'VND')}
                                                        </span>
                                                        <span className={clsx(styles['book-quantity'])}>
                                                            x {item?.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </ListGroup.Item>
                                    );
                                })
                            )}
                        </div>
                        <Link
                            onClick={() => setShowBookList(false)}
                            className={clsx(styles['link-when-not-empty'])}
                            to={linkWhenNotEmpty}
                        >
                            {textLinkWhenNotEmpty}
                        </Link>
                    </ListGroup>
                </div>
            ) : (
                <div
                    className={clsx(styles['group-books'], styles['group-books-empty'], {
                        [styles['show-group-books']]: showBookList,
                    })}
                >
                    <p>{textWhenEmpty}</p>
                    {textLinkWhenEmpty && linkWhenEmpty && (
                        <Link to={linkWhenEmpty} onClick={() => setShowBookList(false)}>
                            {textLinkWhenEmpty}
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default NoticeOfBookList;
