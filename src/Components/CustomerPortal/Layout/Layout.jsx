import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';

const Layout = () => {

    const location = useLocation();

    const hideLayoutPaths = ["/landing-page", "/customer-signup", "/customer-login", "/workers-signup", "/workers-login"];

    const shouldHideLayout = hideLayoutPaths.includes(location.pathname.toLowerCase());

    return (
        <div>
            {!shouldHideLayout && <Navbar />}
            <Outlet />
            {!shouldHideLayout && <Footer />}
        </div>
    )
}

export default Layout