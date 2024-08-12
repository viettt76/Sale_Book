import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import routes, { adminRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPersonalInfoService } from './services/userServices';
import * as actions from '~/redux/actions';
import { useDispatch } from 'react-redux';

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
                const res = await getPersonalInfoService();
                console.log(res);
                dispatch(
                    actions.saveUserInfo({
                        username: res?.data?.userName,
                        email: res?.data?.email,
                        isActive: res?.data?.isActive,
                        phoneNumber: res?.data?.phoneNumber,
                        address: res?.data?.address,
                    }),
                );
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        if (location.pathname !== '/login') {
            fetchGetPersonalInfo();
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
