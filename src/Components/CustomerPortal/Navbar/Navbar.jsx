import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/logo.jpg";
import profileImg from "../../../assets/profile_img.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [activeItem, setActiveItem] = useState("Home");
    const [token, setToken] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (name) => {
        setActiveItem(name);
        setShowMenu(false);
    };

    const handleClicked = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const path = location.pathname;
        if (path === "/") {
            setActiveItem("Home");
        } else if (path === "/howItWorks") {
            setActiveItem("How it works");
        } else if (path === "/about") {
            setActiveItem("About");
        } else if (path === "/contact") {
            setActiveItem("Contact");
        }
    }, [location]);

    useEffect(() => {
        localStorage.setItem("token", "123456");
        // setToken(localStorage.getItem("token"));
    }, []);

    const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
    const toggleHamburger = () => setShowMenu((prev) => !prev);

    return (
        <div className="navbar-container">
            <div className="hamburger-icon" onClick={toggleHamburger}>
                {showMenu ? <FaTimes size={25} /> : <FaBars size={25} />}
            </div>

            <div className="navbar-left">
                <img src={logo} alt="Logo" />
                <h3>E - Labour</h3>
            </div>

            <div className="navbar-middle">
                <ul>
                    <Link to="/">
                        <li
                            className={`button ${activeItem === "Home" ? "clicked" : ""}`}
                            onClick={() => {
                                handleClick("Home"), handleClicked()
                            }}
                        >
                            Home
                        </li>
                    </Link>
                    <Link to="/howItWorks">
                        <li
                            className={`button ${activeItem === "How it works" ? "clicked" : ""
                                }`}
                            onClick={() => { handleClick("How it works"), handleClicked() }}
                        >
                            How it works
                        </li>
                    </Link>
                    <Link to="/about">
                        <li
                            className={`button ${activeItem === "About" ? "clicked" : ""}`}
                            onClick={() => { handleClick("About"), handleClicked() }}
                        >
                            About
                        </li>
                    </Link>
                    <Link to="/contact">
                        <li
                            className={`button ${activeItem === "Contact" ? "clicked" : ""}`}
                            onClick={() => { handleClick("Contact"), handleClick() }}
                        >
                            Contact
                        </li>
                    </Link>
                </ul>
            </div>

            <div className="navbar-right">
                {!token ? (
                    <button
                        onClick={() => {
                            navigate("/landing-page");
                        }}
                    >
                        Sign Up
                    </button>
                ) : (
                    <div className="profile-section">
                        <img src={profileImg} alt="Profile" onClick={toggleProfileMenu} />
                        {showProfileMenu && (
                            <div className="profile-menu">
                                <ul>
                                    <Link onClick={() => { handleClicked() }} to="#">
                                        <li>Your Profile</li>
                                    </Link>
                                    <Link onClick={() => { handleClicked() }} to="#">
                                        <li>Current Booking & Details</li>
                                    </Link>
                                    <Link onClick={() => { handleClicked() }} to="#">
                                        <li>Past Jobs / History</li>
                                    </Link>
                                    <Link onClick={() => { handleClicked() }} to="#">
                                        <li>Support & Help Section</li>
                                    </Link>
                                    <Link to="#">
                                        <li>Logout</li>
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={`side-drawer ${showMenu ? "show" : ""}`}>
                <div className="drawer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul>
                    <Link to="/">
                        <li
                            className={activeItem === "Home" ? "clicked" : ""}
                            onClick={() => { handleClick("Home"), handleClicked() }}
                        >
                            Home
                        </li>
                    </Link>
                    <Link to="/howItWorks">
                        <li
                            className={activeItem === "How it works" ? "clicked" : ""}
                            onClick={() => { handleClick("How it works"), handleClicked() }}
                        >
                            How it works
                        </li>
                    </Link>
                    <Link to="/about">
                        <li
                            className={activeItem === "About" ? "clicked" : ""}
                            onClick={() => { handleClick("About"), handleClicked() }}
                        >
                            About
                        </li>
                    </Link>
                    <Link to="/contact">
                        <li
                            className={activeItem === "Contact" ? "clicked" : ""}
                            onClick={() => { handleClick("Contact"), handleClicked() }}
                        >
                            Contact
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;