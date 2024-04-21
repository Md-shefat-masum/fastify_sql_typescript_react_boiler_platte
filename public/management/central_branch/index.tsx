function t(a: string, b: string): string [] {
    let c: string[] = [
        a,
        b,
    ];

    return c;
}

let m = t("one", "two");
console.log(m);

import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    RouterProvider,
    createHashRouter,
} from "react-router-dom";
import { Provider } from 'react-redux'
// import store from './store/index.js';
// import dashboard_routes from './routes/dashboard_routes.js';

function Component() {
    // const router = createHashRouter([
    //     dashboard_routes,
    // ]);
    // return <RouterProvider router={router}></RouterProvider>
    return <h1>hi</h1>
}

const container: HTMLElement | null = document.getElementById('app');
if(container){
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(
        <Component></Component>
        // <Provider store={store}>
        //     <Component />
        // </Provider>
    );
}