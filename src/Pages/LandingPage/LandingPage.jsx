import React from 'react'
import "./LandingPage.css";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div data-aos="fade-down" className='landing-page'>
                <div data-aos="fade-down" className='landing-content'>
                    <div data-aos="fade-down" className='landing-text'>
                        <h1 data-aos="fade-down">Join Our Platform</h1>
                        <p data-aos="fade-down">Connect with skilled professionals of find work that matters. Choose your path below.</p>

                    </div>
                    <div data-aos="fade-down" className='landing-button'>
                        <button className='forCustomer' onClick={() => {
                            navigate("/customer-signup")
                        }}>SignUp as a Customer</button>
                        <button className='forWorkers' onClick={() => {
                            navigate("/worker-Profile")
                        }}>SignUp as a Workers</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage