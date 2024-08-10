import OnlyHeaderLayout from '~/layouts/OnlyHeaderLayout';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import BookDetails from '~/pages/BookDetails';

// Admin
import AdminLayout from './layouts/AdminLayout';

import AdminPage from '~/pages/AdminPage';
import Pay from '~/pages/Pay';

const routes = [
    { path: '/', element: Home },
    { path: '/login', element: Login, layout: null },
    { path: '/book/:id', element: BookDetails },
    { path: '/book/:id/pay', element: Pay, layout: null },
];

export const adminRoutes = [{ path: '/admin', element: AdminPage, layout: AdminLayout }];

export default routes;
