import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faReceipt, faTicket } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '~/assets/imgs/VEdu.png';
import NoticeOfBookList from '~/components/NoticeOfBookList';
import AccountAvatar from '~/components/AccountAvatar';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { searchBookByNameOrAuthor } from '~/services/bookService';
import { formatPrice } from '~/utils/commonUtils';
import { getMyVoucherService } from '~/services/voucherService';
import Loading from '~/components/Loading';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const searchKey = useDebounce(keyword, 300);

    const [loading, setLoading] = useState(false);

    const searchResultRef = useRef(null);

    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const handleShowSearchResult = () => setShowSearchResult(true);
    const handleCloseSearchResult = () => setShowSearchResult(false);

    useEffect(() => {
        setKeyword('');
        handleCloseSearchResult();
    }, [location]);

    useEffect(() => {
        const fetchSearchBookByNameOrAuthor = async () => {
            try {
                if (searchKey !== '') {
                    const res = await searchBookByNameOrAuthor(searchKey);
                    setSearchResult(res?.data?.datas);
                    handleShowSearchResult();
                } else {
                    setSearchResult([]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSearchBookByNameOrAuthor();
    }, [searchKey]);

    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                setLoading(true);
                const res = await getMyVoucherService();
                setLoading(false);
                setVouchers(res?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchVoucher();
    }, []);

    const [showVouchers, setShowVouchers] = useState(false);
    const voucherWrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchResultRef.current && !searchResultRef.current.contains(e.target)) {
                handleCloseSearchResult();
            }
            if (voucherWrapperRef.current && !voucherWrapperRef.current.contains(e.target)) {
                setShowVouchers(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        console.log(searchKey);
        if (e.key === 'Enter') {
            navigate(`/search?keyword=${keyword}`);
        }
    };

    return (
        <div className={clsx(styles['header'])}>
            <Link to="/">
                <img width={50} height={50} src={logo} alt="VEdu" />
            </Link>
            <div className={clsx(styles['search-wrapper'])}>
                <div className={clsx(styles['search-input'])}>
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={handleShowSearchResult}
                        onKeyDown={handleSearch}
                        placeholder="Tìm tên sách/tên tác giả"
                    />
                    <button className={clsx(styles['search-button'])}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                {searchResult?.length > 0 && showSearchResult && (
                    <div ref={searchResultRef} className={clsx(styles['search-result-wrapper'])}>
                        <div className={clsx(styles['search-result'])}>
                            {searchResult.map((book) => {
                                return (
                                    <Link
                                        to={`/book/${book?.id}`}
                                        key={`book-${book?.id}`}
                                        className={clsx(styles['result-item'])}
                                    >
                                        <img src={book?.image} />
                                        <div className={clsx(styles['result-item-info'])}>
                                            <h6 className={clsx(styles['result-item-header'])}>{book?.title}</h6>
                                            <div className={clsx(styles['result-item-name'])}>{book?.title}</div>
                                            <div className={clsx(styles['result-item-expand'])}>
                                                <div className={clsx(styles['search-result-item-authors'])}>
                                                    {book?.author
                                                        ?.map((a) => {
                                                            return a?.fullName;
                                                        })
                                                        .join(', ')}
                                                </div>
                                                <div className={clsx(styles['search-result-item-price'])}>
                                                    {formatPrice(book?.price, 'VND')}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        <Link to={`/search?keyword=${keyword}`} className={clsx(styles['see-all-result'])}>
                            Xem tất cả
                        </Link>
                    </div>
                )}
            </div>
            <div className={clsx(styles['user-actions'])}>
                <div className={clsx(styles['voucher-wrapper'])} ref={voucherWrapperRef}>
                    <FontAwesomeIcon
                        onClick={() => setShowVouchers(!showVouchers)}
                        className={clsx(styles['icon'])}
                        icon={faTicket}
                    />
                    {showVouchers &&
                        (loading ? (
                            <div className={clsx(styles['voucher-empty'])}>
                                <h2 className="text-center">Voucher</h2>
                                <Loading className="mt-3" />
                            </div>
                        ) : vouchers?.length > 0 ? (
                            <div className={clsx(styles['voucher-list'])}>
                                <h2 className="text-center mb-4">Voucher</h2>
                                {vouchers?.map((voucher) => {
                                    if (voucher?.used) {
                                        return <></>;
                                    }
                                    return (
                                        <div
                                            key={`voucher-${voucher?.voucherId}`}
                                            className={clsx(styles['voucher-item'])}
                                        >
                                            Giảm giá {voucher?.percent}%
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className={clsx(styles['voucher-empty'])}>
                                <p>Bạn không có voucher nào</p>
                            </div>
                        ))}
                </div>
                <NoticeOfBookList
                    title="Giỏ hàng"
                    type="cart"
                    icon={faCartShopping}
                    textLinkWhenNotEmpty="Tới giỏ hàng"
                    linkWhenNotEmpty="/cart"
                    textWhenEmpty="Giỏ hàng của bạn đang trống."
                    textLinkWhenEmpty="Tiếp tục mua sắm"
                    linkWhenEmpty="/"
                />
                <NoticeOfBookList
                    title="Sách đã mua"
                    type="order"
                    icon={faReceipt}
                    textLinkWhenNotEmpty="Tới đơn mua"
                    linkWhenNotEmpty="/order"
                    textWhenEmpty="Bạn chưa mua quyển sách nào."
                    textLinkWhenEmpty="Khám phá thêm"
                    linkWhenEmpty="/"
                />
                <AccountAvatar className={clsx(styles['user-action'])} />
            </div>
        </div>
    );
};

export default Header;
