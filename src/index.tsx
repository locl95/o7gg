import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import View from "./pages/View";
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },{
        path: ":viewId",
        element: <View/>
    },{
        path: "error",
        element: <NotFound />
    }
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);