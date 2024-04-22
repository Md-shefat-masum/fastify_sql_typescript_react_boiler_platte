import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';

const router: RouteObject[] = [
    {
        path: '/',
        element: <DashboardLayout/>,
    },
];

export default router;
