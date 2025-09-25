import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';

const Layout = () => {
    const location = useLocation();

    const hideLayoutPaths = [
        "/landing-page",
        "/customer-signup",
        "/customer-login",
        "/workers-signup",
        "/workers-login",
        "/worker-profile/add-workers-details",
        "/worker-profile/submission-success"
    ];

    let currentPath = location.pathname.toLowerCase();

    if (currentPath.endsWith('/') && currentPath.length > 1) {
        currentPath = currentPath.slice(0, -1);
    }

    const shouldHideLayout = hideLayoutPaths.includes(currentPath);

    return (
        <div>
            {!shouldHideLayout && <Navbar />}
            <Outlet />
            {!shouldHideLayout && <Footer />}
        </div>
    )
}

export default Layout