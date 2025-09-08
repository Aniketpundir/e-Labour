import React from 'react'
import "./LandingPage.css";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='landing-page'>
                <div className='landing-content'>
                    <div className='landing-text'>
                        <h1>Join Our Platform</h1>
                        <p>Connect with skilled professionals of find work that matters. Choose your</p>
                        <p>path below.</p>
                    </div>
                    <div className='landing-button'>
                        <button className='forCustomer' onClick={() => {
                            navigate("/customer-signup")
                        }}>SignUp as a Customer</button>
                        <button className='forWorkers' onClick={() => {
                            navigate("/workers-signup")
                        }}>SignUp as a Workers</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage