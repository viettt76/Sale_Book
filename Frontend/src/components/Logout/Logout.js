import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
// import { logoutService } from '~/services';

const Logout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        // logoutService();
        // if (location.pathname !== '/') {
        //     navigate('/');
        // }
        // window.location.reload();
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <div onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> <span className="fz-16">Đăng xuất</span>
        </div>
    );
};

export default Logout;
