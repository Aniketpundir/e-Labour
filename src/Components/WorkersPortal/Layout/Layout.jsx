import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../CustomerPortal/Navbar/Navbar'
// customer footer use in this panel
import Footer from "../../CustomerPortal/Footer/Footer"
////

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout