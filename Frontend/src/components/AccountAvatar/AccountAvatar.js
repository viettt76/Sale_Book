import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './AccountAvatar.module.scss';
import Logout from '~/components/Logout';
import avatarDefault from '~/assets/imgs/avatar-default.png';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '~/redux/selectors';

const AccountAvatar = () => {
    const userInfo = useSelector(userInfoSelector);

    const generalMenu = [[{ title: 'Đăng xuất', component: Logout }]];

    const location = useLocation();

    const menu =
        userInfo?.role === 'Admin'
            ? [
                  [
                      {
                          title: location.pathname === '/admin' ? 'Client Page' : 'Admin Page',
                          link: location.pathname === '/admin' ? '/' : '/admin',
                      },
                  ],
                  ...generalMenu,
              ]
            : generalMenu;
    const [showMenu, setShowMenu] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    return (
        <div className={clsx(styles['wrapper'])} ref={ref}>
            <img
                className={clsx('rounded-circle', styles['avatar'])}
                src={avatarDefault}
                onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
                <div className={clsx(styles['menu'])}>
                    <div className={clsx(styles['menu-user-info'])}>
                        <img className={clsx('rounded-circle', styles['menu-avatar'])} src={avatarDefault} />
                        <div>
                            <span className={clsx(styles['menu-user-name'])}>{userInfo?.username}</span>
                        </div>
                    </div>
                    <ul className={clsx(styles['menu-section'])}>
                        {menu?.map((section, index) => {
                            return (
                                <li key={`section-${index}`} className={clsx(styles['section'])}>
                                    <ul className={clsx(styles['group-menu-item'])}>
                                        {section?.map((item) => {
                                            if (item?.component) {
                                                const Component = item?.component;
                                                return (
                                                    <li
                                                        key={`item-component-${index}`}
                                                        className={clsx(styles['menu-item'])}
                                                    >
                                                        <Component />
                                                    </li>
                                                );
                                            }
                                            if (item?.link) {
                                                return (
                                                    <li
                                                        key={`item-link-${index}`}
                                                        className={clsx(styles['menu-item'])}
                                                    >
                                                        <Link to={item?.link}>{item?.title}</Link>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={`item-${index}`} className={clsx(styles['menu-item'])}>
                                                        {item?.title}
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AccountAvatar;
