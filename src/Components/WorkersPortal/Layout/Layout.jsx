import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
// customer footer use in this panel
import Footer from "../../CustomerPortal/Footer/Footer"
import Navbar from '../../CustomerPortal/Navbar/Navbar'

const Layout = () => {
    const location = useLocation();

    const hideLayoutPaths = [
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