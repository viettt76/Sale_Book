import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import routes, { adminRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchUserData from '~/hooks/useFetchUserData';
import { useSelector } from 'react-redux';
import { userInfoSelector } from './redux/selectors';
import NotFound from '~/pages/NotFound';
import { SetupInterceptors } from './utils/axios';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function FetchUserInfo() {
    const location = useLocation();
    const fetchUserData = useFetchUserData();

    useEffect(() => {
        if (location.pathname !== '/login') {
            fetchUserData();
        }
    }, [fetchUserData, location.pathname]);

    return null;
}

function NavigateFunctionComponent() {
    let navigate = useNavigate();
    const [ran, setRan] = useState(false);

    {
        /* only run setup once */
    }
    if (!ran) {
        SetupInterceptors(navigate);
        setRan(true);
    }
    return <></>;
}

function App() {
    const userInfo = useSelector(userInfoSelector);

    return (
        <BrowserRouter>
            {<NavigateFunctionComponent />}
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
                {userInfo?.role === 'Admin' &&
                    adminRoutes.map((route, index) => {
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
                <Route element={NotFound} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
