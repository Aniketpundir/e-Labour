import React from 'react'
import "./ServiceCard.css";
// import img from "../../../../assets/Carpenter.jpeg"

const ServiceCard = ({ img, title }) => {

    return (
        <>
            <div className='service-card-container'>
                <div className='service-card-menu'>
                    <img src={img} alt='Service Image' />
                    <p>{title}</p>
                </div>
            </div>
        </>
    )
}

export default ServiceCard