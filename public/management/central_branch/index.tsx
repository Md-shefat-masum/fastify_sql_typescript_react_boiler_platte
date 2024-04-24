import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import dashboard_routes from './routes';

function Component() {
    const router = createHashRouter(dashboard_routes);
    return <RouterProvider router={router}></RouterProvider>;
}

const container: HTMLElement | null = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        // <Component></Component>,
        <Provider store={store}>
            <Component />
        </Provider>,
    );
}
