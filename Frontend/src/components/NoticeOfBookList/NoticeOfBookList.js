import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './NoticeOfBookList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPrice } from '~/utils/commonUtils';
import avatarDefault from '~/assets/imgs/avatar-default.png';
import { useSelector } from 'react-redux';
import { cartSelector } from '~/redux/selectors';

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

    const cart = useSelector(cartSelector);

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowBookList(false);
        }
    };

    useEffect(() => {
        if (type === 'cart') {
            setBookList(
                cart?.map((c) => {
                    return {
                        id: c?.bookId,
                        name: c?.bookName,
                        img: c?.img,
                        price: c?.bookPrice,
                        quantity: c?.quantity,
                    };
                }),
            );
        }
    }, [type, cart]);

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
                            {bookList?.map((item, index) => {
                                return (
                                    <ListGroup.Item key={`book-${index}`}>
                                        <Link
                                            onClick={() => setShowBookList(false)}
                                            className={clsx(styles['book'])}
                                            to={`/book/${item?.id}`}
                                        >
                                            <img
                                                className={clsx(styles['book-img'])}
                                                src={avatarDefault}
                                                alt={item?.name}
                                            />
                                            <div>
                                                <h5 className={clsx(styles['book-name'])}>{item?.name}</h5>
                                                <span className={clsx(styles['book-price'])}>
                                                    {formatPrice(item?.price, 'VND')}
                                                </span>
                                            </div>
                                        </Link>
                                    </ListGroup.Item>
                                );
                            })}
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
                    {textLinkWhenEmpty && linkWhenEmpty && <Link to={linkWhenEmpty}>{textLinkWhenEmpty}</Link>}
                </div>
            )}
        </div>
    );
};

export default NoticeOfBookList;
