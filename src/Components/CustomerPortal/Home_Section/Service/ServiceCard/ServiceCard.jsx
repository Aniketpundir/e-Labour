import React from 'react'
import "./ServiceCard.css";

const ServiceCard = ({ img, title }) => {


    return (
        <>
            <div className='service-card'>
                <div className='service-img'>
                    <img src={img} alt='Service Image' />
                </div>
                <div className='service-text'>
                    <h3>{title}</h3>
                    <p>Professional cleaning for your home</p>
                    <button className='service-btn'>Book Now</button>
                </div>
            </div>
        </>
    )
}

export default ServiceCard