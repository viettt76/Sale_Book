import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './NoticeOfBookList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPrice } from '~/utils/commonUtils';
import avatarDefault from '~/assets/imgs/avatar-default.png';

const NoticeOfBookList = ({
    title,
    icon,
    textLinkWhenNotEmpty,
    linkWhenNotEmpty,
    textWhenEmpty,
    textLinkWhenEmpty,
    linkWhenEmpty,
}) => {
    const [bookListState, setBookListState] = useState([]);
    const [showBookList, setShowBookList] = useState(false);

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowBookList(false);
        }
    };

    useEffect(() => {
        setBookListState([
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
            {
                id: '1',
                name: 'name',
                img: 'img',
                price: 2,
            },
        ]);
    }, []);

    // useEffect(() => {
    //     const fetchBookList = async () => {
    //         try {
    //             let res, clone;
    //             switch (type) {
    //                 case 'favorites':
    //                     res = await getFavoriteBookListService();
    //                     if (!res?.errCode) {
    //                         clone = res?.data?.map((book) => {
    //                             return {
    //                                 id: book?.bookId,
    //                                 name: book?.likedBookInfo?.name,
    //                                 img: book?.likedBookInfo?.img,
    //                                 price: book?.likedBookInfo?.price,
    //                             };
    //                         });
    //                     }
    //                     break;
    //                 case 'cart':
    //                     res = await getBookCartService();
    //                     if (!res?.errCode) {
    //                         clone = res?.data?.map((book) => {
    //                             return {
    //                                 id: book?.bookId,
    //                                 name: book?.bookCartInfo?.name,
    //                                 img: book?.bookCartInfo?.img,
    //                                 price: book?.bookCartInfo?.price,
    //                             };
    //                         });
    //                     }
    //                     break;
    //                 case 'studying':
    //                     res = await getPurchasedBookService();
    //                     if (!res?.errCode) {
    //                         clone = res?.data?.map((book) => {
    //                             return {
    //                                 id: book?.bookId,
    //                                 name: book?.purchasedBookInfo?.name,
    //                                 img: book?.purchasedBookInfo?.img,
    //                                 price: book?.purchasedBookInfo?.price,
    //                             };
    //                         });
    //                     }
    //                     break;
    //                 default:
    //                     throw Error('Error from server');
    //             }
    //             setBookListState(clone);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchBookList();
    // }, [type, showBookList]);

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
            {bookListState?.length > 0 ? (
                <div>
                    <ListGroup
                        className={clsx(styles['group-books'], {
                            [styles['show-group-books']]: showBookList,
                        })}
                    >
                        <h5 className={clsx(styles['title'])}>{title}</h5>
                        <div className={clsx(styles['books'])}>
                            {bookListState?.map((item, index) => {
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
