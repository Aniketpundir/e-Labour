import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";
import logo from "../../../assets/logo.jpg";
import profileImg from "../../../assets/profile_img.png";
import image from "../../../assets/101.jpg"
import { FaBars } from "react-icons/fa";
import { StoreContext } from "../../../Context/StoreContext";

const Navbar = () => {
    const { workerToken, setCustomerToken, customerToken, setWorkerToken, customerProfileData, workerProfileData } = useContext(StoreContext);


    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [hideWorkerPanel, setHideWorkerPanel] = useState(false);
    const [activeItem, setActiveItem] = useState();
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
        } else if (path === "/worker-profile") {
            setActiveItem("Profile");
        } else if (path === "/worker-profile/Dashboard") {
            setActiveItem("Dashboard");
        } else if (path === "/worker-profile/Job-Request") {
            setActiveItem("Job Request");
        } else if (path === "/worker-profile/Rating&Reviews") {
            setActiveItem("Rating & Reviews")
        } else {
            setActiveItem("");
            setHideWorkerPanel(false)
        }
    }, [location]);
    useEffect((e) => {
        const path = location.pathname;
        if (path === "/worker-profile") {
            setHideWorkerPanel(true);
        } else if (path === "/worker-profile/Dashboard") {
            setHideWorkerPanel(true);
        } else if (path === "/worker-profile/Job-Request") {
            setHideWorkerPanel(true);
        } else if (path === "/worker-profile/Rating&Reviews") {
            setHideWorkerPanel(true);
        } else if (path === "/worker-profile/add-workers-details") {
            setHideWorkerPanel(true);
        } else if (path === "/worker-profile/submission-success") {
            setHideWorkerPanel(true);
        }
    }, [location]);
    useEffect(() => {
        if (workerToken) {
            navigate("/worker-profile");
        }
    }, [workerToken])


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
                {!hideWorkerPanel ?
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
                    :
                    <ul>
                        <Link to="/worker-profile">
                            <li
                                className={`button ${activeItem === "Profile" ? "clicked" : ""}`}
                                onClick={() => { handleClick("Profile"), handleClick() }}
                            >
                                Profile
                            </li>
                        </Link>
                        <Link to="/worker-profile/Dashboard">
                            <li
                                className={`button ${activeItem === "Dashboard" ? "clicked" : ""}`}
                                onClick={() => { handleClick("Dashboard"), handleClick() }}
                            >
                                Dashboard
                            </li>
                        </Link>
                        <Link to="/worker-profile/Job-Request">
                            <li
                                className={`button ${activeItem === "Job Request" ? "clicked" : ""}`}
                                onClick={() => { handleClick("Job Request"), handleClick() }}
                            >
                                Job Request
                            </li>
                        </Link>
                        <Link to="/worker-profile/Rating&Reviews">
                            <li
                                className={`button ${activeItem === "Rating & Reviews" ? "clicked" : ""}`}
                                onClick={() => { handleClick("Rating & Reviews"), handleClick() }}
                            >
                                Rating & Reviews
                            </li>
                        </Link>
                    </ul>
                }
            </div>

            <div className="navbar-right">
                {!workerToken && !customerToken ? (
                    <button onClick={() => navigate("/landing-page")}>
                        Sign Up
                    </button>
                ) : customerToken ?
                    (
                        <div className="profile-section">
                            <img
                                src={customerProfileData.customer &&
                                    customerProfileData.customer.avatar &&
                                    customerProfileData.customer.avatar.image}
                                alt="Profile"
                                onClick={customerToken ? toggleProfileMenu : undefined} // menu only for customers
                                style={{ cursor: customerToken ? "pointer" : "default" }}
                            />

                            {/* Show menu only for customer */}
                            {customerToken && showProfileMenu && (
                                <div className="profile-menu">
                                    <ul>
                                        <Link onClick={() => { handleClicked(); toggleProfileMenu(); }} to="/Customer-Profile">
                                            <li>Your Profile</li>
                                        </Link>
                                        <Link onClick={() => { handleClicked(); toggleProfileMenu(); }} to="/Current-Booking">
                                            <li>Current Booking & Details</li>
                                        </Link>
                                        <Link onClick={() => { handleClicked(); toggleProfileMenu(); }} to="/Past-Booking">
                                            <li>Past Jobs / History</li>
                                        </Link>
                                        <Link onClick={() => { handleClicked(); toggleProfileMenu(); }} to="/Support-Section">
                                            <li>Support & Help Section</li>
                                        </Link>
                                        <Link to="#">
                                            <li onClick={() => {
                                                localStorage.removeItem("customerToken");
                                                setCustomerToken("");
                                                navigate("/");
                                            }}>Logout</li>
                                        </Link>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : workerToken
                        ? (
                            <div className="worker-image-logout">
                                <button onClick={() => { localStorage.removeItem("workerToken"); setWorkerToken(""); navigate("/") }}>Logout</button>
                                <div className="profile-section">
                                    <img
                                        src={workerProfileData.workerId
                                            &&
                                            workerProfileData.workerId.avatar
                                            &&
                                            workerProfileData.workerId.avatar.image}
                                        alt="Profile"
                                        onClick={customerToken ? toggleProfileMenu : undefined}
                                        style={{ cursor: customerToken ? "pointer" : "default" }}
                                    />
                                </div>
                            </div>) :
                        null}
            </div>

            <div className={`side-drawer ${showMenu ? "show" : ""}`}>
                <div className="drawer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                {!hideWorkerPanel
                    ?
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
                    :
                    <ul>
                        <Link to="/worker-profile">
                            <li
                                className={`button ${activeItem === "Profile" ? "clicked" : ""}`}
                                onClick={() => { handleClick("Profile"), handleClick() }}
                            >
                                Profile
                            </li>
                        </Link>
                        <Link to="/worker-profile/Dashboard">
                            <li
                                className={`button ${activeItem === "Dashboard" ? "clicked" : ""}`}
                                onClick={() => { handleClick("Dashboard"), handleClick() }}
                            >
                                Dashboard
                            </li>
                        </Link>
                        <Link to="/worker-profile/Job-Request">
                            <li
                                className={`button ${activeItem === "Job Request" ? "clicked" : ""}`}
                                onClick={() => { handleClick("Job Request"), handleClick() }}
                            >
                                Job Request
                            </li>
                        </Link>
                        <Link to="/worker-profile/Rating&Reviews">
                            <li
                                className={`button ${activeItem === "Rating & Reviews" ? "clicked" : ""}`}
                                onClick={() => { handleClick("Rating & Reviews"), handleClick() }}
                            >
                                Rating & Reviews
                            </li>
                        </Link>
                    </ul>
                }
            </div>
        </div>
    );
};

export default Navbar;