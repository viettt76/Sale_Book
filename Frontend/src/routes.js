import { lazy } from 'react';

import OnlyHeaderLayout from '~/layouts/OnlyHeaderLayout';

import Home from '~/pages/Home';
// const Login = lazy(() => import('~/pages/Login'));

const routes = [
    { path: '/', element: Home },
    // { path: '/login', element: Login, layout: null },
];

export default routes;
