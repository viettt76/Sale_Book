import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserInfo } from '~/redux/actions/';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUserInfo());
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
