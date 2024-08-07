import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faHeart, faReceipt } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '~/assets/imgs/VEdu.png';
import NoticeOfBookList from '~/components/NoticeOfBookList';
import AccountAvatar from '~/components/AccountAvatar';

const Header = () => {
    return (
        <div className={clsx(styles['header'])}>
            <Link to="/">
                <img width={50} height={50} src={logo} alt="VEdu" />
            </Link>
            <div className={clsx(styles['search-wrapper'])}>
                <div className={clsx(styles['search-input'])}>
                    <input placeholder="Tìm tên sách" />
                    <button className={clsx(styles['search-button'])}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>
            <div className={clsx(styles['user-actions'])}>
                <NoticeOfBookList
                    title="Giỏ hàng"
                    type="cart"
                    icon={faCartShopping}
                    textWhenEmpty="Giỏ hàng của bạn đang trống."
                    textLinkWhenEmpty="Tiếp tục mua sắm"
                    linkWhenEmpty="/"
                />
                <NoticeOfBookList
                    title="Sách yêu thích"
                    type="favorites"
                    icon={faHeart}
                    textWhenEmpty="Danh sách yêu thích của bạn đang trống."
                    textLinkWhenEmpty="Khám phá thêm"
                    linkWhenEmpty="/"
                />
                <NoticeOfBookList
                    title="Sách đã mua"
                    type="bought"
                    icon={faReceipt}
                    textWhenEmpty="Bạn chưa mua quyển sách nào."
                    textLinkWhenEmpty="Khám phá thêm"
                    linkWhenEmpty="/"
                />
                <AccountAvatar className={clsx(styles['user-action'])} />
            </div>

            {/* <div>
            <Link
                className={clsx('btn btn-dark font-weight-bold text-nowrap', styles['btn-login'])}
                to="/login"
            >
                Đăng nhập
            </Link>
        </div> */}
        </div>
    );
};

export default Header;
