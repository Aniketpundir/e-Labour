import React from 'react'
import "./Footer.css"
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    const Navigate = useNavigate();
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <div className='footer-section'>
                <div className='footer-container'>
                    <div className='footer-left'>
                        <h1>E - Labour</h1>
                        <p>Connecting skilled workers with those who need them.</p>
                    </div>
                    <div className='footer-middle1'>
                        <h3>Quick Links</h3>
                        <p onClick={() => {
                            Navigate("/"), handleClick()
                        }}>Home</p>
                        <p onClick={() => {
                            Navigate("/howItWorks"), handleClick()
                        }}>How it Works</p>
                        <p onClick={() => {
                            Navigate("/about"), handleClick()
                        }}>About Us</p>
                        <p onClick={() => {
                            Navigate("/contact"), handleClick()
                        }}>Contact</p>
                    </div>
                    <div className='footer-middle2'>
                        <h3>Legal</h3>
                        <Link><p>Terms of Service</p></Link>
                        <Link><p>Privacy Policy</p></Link>
                    </div>
                    <div className='footer-right'>
                        <h3>Follow Us</h3>
                        <div className='social-icons'>
                            <Link><p><FaFacebook /></p></Link>
                            <Link><p><FaTwitter /></p></Link>
                            <Link><p><FaInstagram /></p></Link>
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <hr />
                    <p >&copy; 2025 E - Labour. All Rights Reserved.</p>
                </div>
            </div>
        </>
    )
}

export default Footer