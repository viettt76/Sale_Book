import { lazy } from 'react';

import OnlyHeaderLayout from '~/layouts/OnlyHeaderLayout';

import Home from '~/pages/Home';
// const Login = lazy(() => import('~/pages/Login'));
import BookDetails from '~/pages/BookDetails';

// Admin

import AdminPage from '~/pages/AdminPage';

const routes = [
    { path: '/', element: Home },
    // { path: '/login', element: Login, layout: null },
    { path: '/book/:id', element: BookDetails },
];

export const adminRoutes = [{ path: '/admin/manage-book', element: AdminPage, layout: null }];

export default routes;
