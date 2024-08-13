import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import routes, { adminRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPersonalInfoService } from '~/services/userServices';
import * as actions from '~/redux/actions';
import { useDispatch } from 'react-redux';
import customToastify from '~/utils/customToastify';
import { getCartService } from '~/services/cartService';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function FetchUserInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchGetPersonalInfo = async () => {
            try {
                const resUserInfo = await getPersonalInfoService();
                dispatch(
                    actions.saveUserInfo({
                        id: resUserInfo?.data?.id,
                        username: resUserInfo?.data?.userName,
                        email: resUserInfo?.data?.email,
                        role: resUserInfo?.data?.role,
                        phoneNumber: resUserInfo?.data?.phoneNumber,
                        address: resUserInfo?.data?.address,
                    }),
                );
            } catch (error) {
                customToastify.info('Bạn đã hết phiên đăng nhập');
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        const fetchGetCart = async () => {
            try {
                const resCart = await getCartService();
                dispatch(actions.addBooksToCart(resCart?.data?.cartItems));
            } catch (error) {
                console.log(error);
            }
        };

        if (location.pathname !== '/login') {
            fetchGetPersonalInfo();
            fetchGetCart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <FetchUserInfo />
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.element;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = React.Fragment;
                    }
                    return (
                        <Route
                            key={`route-${index}`}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
                {adminRoutes.map((route, index) => {
                    const Page = route.element;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = React.Fragment;
                    }
                    return (
                        <Route
                            key={`route-${index}`}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
