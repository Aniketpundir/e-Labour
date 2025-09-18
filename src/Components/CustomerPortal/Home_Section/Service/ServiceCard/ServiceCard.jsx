import React from 'react'
import "./ServiceCard.css";
import { useLocation, useNavigate } from 'react-router-dom';

const ServiceCard = ({ img, title, description }) => {
    const location = useLocation();
    const Navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleClik = () => {
        const path = location.pathname;

        if (token) {
            Navigate(`/Service-Categories/Listed-Workers/${title}`)
        } else {
            Navigate('/login');
            toast.error("Please login first!", {
                position: "bottom-left",
                autoClose: 5000,
            });
        }
    }

    return (
        <>
            <div className='service-card'>
                <div className='service-img'>
                    <img src={img} alt='Service Image' />
                </div>
                <div className='service-text'>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <button onClick={() => { handleClik() }} className='service-btn'>Book Now</button>
                </div>
            </div>
        </>
    )
}

export default ServiceCard