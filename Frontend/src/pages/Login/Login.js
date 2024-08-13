import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import styles from './Login.module.scss';
import customToastify from '~/utils/customToastify';
import { getPersonalInfoService, loginService, signUpService } from '~/services/userServices';
import { useDispatch } from 'react-redux';
import * as actions from '~/redux/actions';
import { getCartService } from '~/services/cartService';

function Login() {
    const navigate = useNavigate(null);
    const dispatch = useDispatch();

    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [validatedFormLogin, setValidatedFormLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');

    const loginFormRef = useRef(null);
    const signUpFormRef = useRef(null);
    const usernameSignupRef = useRef(null);

    const [signUpInfo, setSignUpInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phoneNumber: '',
    });

    const [showFormSignUp, setShowFormSignUp] = useState(false);
    const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
    const [validatedFormSignUp, setValidatedFormSignUp] = useState(false);
    const [usernameExisted, setUsernameExisted] = useState([]);

    const toggleShowPasswordLogin = () => {
        setShowPasswordLogin(!showPasswordLogin);
    };

    const toggleShowPasswordSignUp = () => {
        setShowPasswordSignUp(!showPasswordSignUp);
    };

    const handleCloseFormSignUp = () => setShowFormSignUp(false);
    const handleShowFormSignUp = () => setShowFormSignUp(true);

    const handleChangeFormLogin = (e) => {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value,
        });
    };

    const handleSubmitFormLogin = async (e) => {
        try {
            const form = loginFormRef.current;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
                setValidatedFormLogin(true);
            } else {
                const res = await loginService(loginInfo);
                if (res?.data?.token) {
                    localStorage.setItem('token', res?.data.token);

                    const fetchGetPersonalInfo = async () => {
                        try {
                            const res = await getPersonalInfoService();
                            dispatch(
                                actions.saveUserInfo({
                                    id: res?.data?.id,
                                    username: res?.data?.userName,
                                    email: res?.data?.email,
                                    role: res?.data?.role,
                                    phoneNumber: res?.data?.phoneNumber,
                                    address: res?.data?.address,
                                }),
                            );
                            const resCart = await getCartService();
                            dispatch(actions.addBooksToCart(resCart?.data?.cartItems));
                        } catch (error) {
                            console.log(error);
                        }
                    };
                    fetchGetPersonalInfo();

                    navigate('/');
                }
            }
        } catch (error) {
            setErrorLogin('Tài khoản hoặc mật khẩu của bạn không chính xác');
        }
    };

    const handleEnterToLogin = (e) => {
        if (e.key === 'Enter') {
            handleSubmitFormLogin(e);
        }
    };

    const handleChangeFormSignUp = (e) => {
        const { name, value } = e.target;
        setSignUpInfo({
            ...signUpInfo,
            [name]: value,
        });
    };

    const handleSubmitFormSignUp = async (e) => {
        try {
            const form = signUpFormRef.current;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
                setValidatedFormSignUp(true);
            } else {
                await signUpService({
                    username: signUpInfo.username,
                    email: signUpInfo.email,
                    password: signUpInfo.password,
                    address: signUpInfo.address,
                    phoneNumber: signUpInfo.phoneNumber,
                });

                customToastify.success('Đăng ký tài khoản thành công!');

                setSignUpInfo({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    address: '',
                    phoneNumber: '',
                });

                setValidatedFormSignUp(false);
                setShowFormSignUp(false);
            }
        } catch (error) {
            if (Number(error.status) === 400) {
                setValidatedFormSignUp(true);
                setUsernameExisted([...usernameExisted, signUpInfo.username]);
            }
        }
    };

    const handleEnterToSignup = (e) => {
        if (e.key === 'Enter') {
            handleSubmitFormSignUp(e);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className={clsx('p-4', styles['login-wrapper'])}>
                <Form ref={loginFormRef} noValidate validated={validatedFormLogin}>
                    <Form.Group className="mb-3" as={Col} md="12">
                        <Form.Control
                            value={loginInfo.username}
                            name="username"
                            className="fz-16"
                            type="text"
                            placeholder="Tài khoản"
                            required
                            onKeyUp={handleEnterToLogin}
                            onChange={handleChangeFormLogin}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative" as={Col} md="12">
                        <Form.Control
                            value={loginInfo.password}
                            name="password"
                            className="fz-16"
                            type={showPasswordLogin ? 'text' : 'password'}
                            placeholder="Mật khẩu"
                            required
                            onKeyUp={handleEnterToLogin}
                            onChange={handleChangeFormLogin}
                        />
                        {showPasswordLogin ? (
                            <FontAwesomeIcon
                                className={clsx(styles['show-hide-password'])}
                                icon={faEye}
                                onClick={toggleShowPasswordLogin}
                            />
                        ) : (
                            <FontAwesomeIcon
                                className={clsx(styles['show-hide-password'])}
                                icon={faEyeSlash}
                                onClick={toggleShowPasswordLogin}
                            />
                        )}
                    </Form.Group>
                    {errorLogin && (
                        <div className={clsx('mb-3', styles['invalid-feedback'])}>
                            Tài khoản hoặc mật khẩu của bạn không chính xác
                        </div>
                    )}
                </Form>
                <Button className="w-100 fz-16" onClick={handleSubmitFormLogin}>
                    Đăng nhập
                </Button>
                <Link to="forgot-password" className={clsx(styles['forgot-password'])}>
                    Quên mật khẩu?
                </Link>
                <div className={clsx('d-flex justify-content-center', styles['sign-up-wrapper'])}>
                    <Button className={clsx(styles['sign-up-btn'])} onClick={handleShowFormSignUp}>
                        Tạo tài khoản mới
                    </Button>

                    <Modal show={showFormSignUp} onHide={handleCloseFormSignUp}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <div className={clsx(styles['modal-sign-up-title'])}>Đăng ký</div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form ref={signUpFormRef} noValidate validated={validatedFormSignUp}>
                                <Form.Group className="mb-3" as={Col} md="12">
                                    <Form.Control
                                        ref={usernameSignupRef}
                                        value={signUpInfo.username}
                                        name="username"
                                        className={clsx('fz-16', {
                                            [styles['invalid']]: usernameExisted.includes(signUpInfo.username),
                                        })}
                                        placeholder="Tài khoản"
                                        required
                                        onKeyUp={handleEnterToSignup}
                                        isInvalid={usernameExisted.includes(signUpInfo.username)}
                                        onChange={handleChangeFormSignUp}
                                    />
                                    {usernameExisted.includes(signUpInfo.username) && (
                                        <Form.Control.Feedback className="fz-16" type="invalid">
                                            Tài khoản đã tồn tại
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} md="12">
                                    <Form.Control
                                        value={signUpInfo.email}
                                        name="email"
                                        type="email"
                                        className="fz-16"
                                        placeholder="Email"
                                        required
                                        onKeyUp={handleEnterToSignup}
                                        onChange={handleChangeFormSignUp}
                                    />
                                    <Form.Control.Feedback className="fz-16" type="invalid">
                                        Email không hợp lệ
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3 position-relative" as={Col} md="12">
                                    <Form.Control
                                        value={signUpInfo.password}
                                        name="password"
                                        type={showPasswordSignUp ? 'text' : 'password'}
                                        className="fz-16"
                                        minLength={6}
                                        placeholder="Mật khẩu"
                                        required
                                        onKeyUp={handleEnterToSignup}
                                        onChange={handleChangeFormSignUp}
                                    />
                                    <Form.Control.Feedback className="fz-16" type="invalid">
                                        Mật khẩu ít nhất 6 ký tự
                                    </Form.Control.Feedback>
                                    {showPasswordSignUp ? (
                                        <FontAwesomeIcon
                                            className={clsx(styles['show-hide-password'])}
                                            icon={faEye}
                                            onClick={toggleShowPasswordSignUp}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className={clsx(styles['show-hide-password'])}
                                            icon={faEyeSlash}
                                            onClick={toggleShowPasswordSignUp}
                                        />
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} md="12">
                                    <Form.Control
                                        value={signUpInfo.confirmPassword}
                                        name="confirmPassword"
                                        type={showPasswordSignUp ? 'text' : 'password'}
                                        className="fz-16"
                                        minLength={6}
                                        placeholder="Mật khẩu xác nhận"
                                        required
                                        onKeyUp={handleEnterToSignup}
                                        pattern={signUpInfo.password}
                                        isInvalid={
                                            validatedFormSignUp && signUpInfo.password !== signUpInfo.confirmPassword
                                        }
                                        onChange={handleChangeFormSignUp}
                                    />
                                    <Form.Control.Feedback className="fz-16" type="invalid">
                                        Mật khẩu xác nhận sai
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} md="12">
                                    <Form.Control
                                        value={signUpInfo.address}
                                        name="address"
                                        className="fz-16"
                                        placeholder="Địa chỉ"
                                        required
                                        onKeyUp={handleEnterToSignup}
                                        onChange={handleChangeFormSignUp}
                                    />
                                    <Form.Control.Feedback className="fz-16" type="invalid">
                                        Địa chỉ không được để trống
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} md="12">
                                    <Form.Control
                                        value={signUpInfo.phoneNumber}
                                        name="phoneNumber"
                                        className="fz-16"
                                        placeholder="Số điện thoại"
                                        required
                                        onKeyUp={handleEnterToSignup}
                                        onChange={handleChangeFormSignUp}
                                    />
                                    <Form.Control.Feedback className="fz-16" type="invalid">
                                        Số điện thoại không được để trống
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className={clsx('fz-16', styles['sign-up-btn'])} onClick={handleSubmitFormSignUp}>
                                Đăng ký
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Login;
