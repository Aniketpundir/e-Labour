import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/logo.jpg";
import { Link } from "react-router-dom";
import profileImg from "../../../assets/profile_img.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [activeItem, setActiveItem] = useState("Home");
    const [token, setToken] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const Navigate = useNavigate();

    const handleClick = (name) => {
        setActiveItem(name);
        setShowMenu(false);
    };

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
                            onClick={() => handleClick("Home")}
                        >
                            Home
                        </li>
                    </Link>
                    <Link to="/howItWorks">
                        <li
                            className={`button ${activeItem === "How it works" ? "clicked" : ""}`}
                            onClick={() => handleClick("How it works")}
                        >
                            How it works
                        </li>
                    </Link>
                    <Link to="/about">
                        <li
                            className={`button ${activeItem === "About" ? "clicked" : ""}`}
                            onClick={() => handleClick("About")}
                        >
                            About
                        </li>
                    </Link>
                    <Link to="/contact">
                        <li
                            className={`button ${activeItem === "Contact" ? "clicked" : ""}`}
                            onClick={() => handleClick("Contact")}
                        >
                            Contact
                        </li>
                    </Link>
                </ul>
            </div>

            <div className="navbar-right">
                {!token ? (
                    <button onClick={() => {
                        Navigate("/landing-page")
                    }}>Sign Up</button>
                ) : (
                    <div className="profile-section">
                        <img src={profileImg} alt="Profile" onClick={toggleProfileMenu} />
                        {showProfileMenu && (
                            <div className="profile-menu">
                                <ul>
                                    <Link to="#"><li>Your Profile</li></Link>
                                    <Link to="#"><li>Current Booking & Details</li></Link>
                                    <Link to="#"><li>Past Jobs / History</li></Link>
                                    <Link to="#"><li>Support & Help Section</li></Link>
                                    <Link to="#"><li>Logout</li></Link>
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
                            onClick={() => handleClick("Home")}
                        >
                            Home
                        </li>
                    </Link>
                    <Link to="/howItWorks">
                        <li
                            className={activeItem === "How it works" ? "clicked" : ""}
                            onClick={() => handleClick("How it works")}
                        >
                            How it works
                        </li>
                    </Link>
                    <Link to="/about">
                        <li
                            className={activeItem === "About" ? "clicked" : ""}
                            onClick={() => handleClick("About")}
                        >
                            About
                        </li>
                    </Link>
                    <Link to="/contact">
                        <li
                            className={activeItem === "Contact" ? "clicked" : ""}
                            onClick={() => handleClick("Contact")}
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
