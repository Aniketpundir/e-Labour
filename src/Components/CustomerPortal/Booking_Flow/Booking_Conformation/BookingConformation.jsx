import React, { useState } from 'react'
import "./BookingConformation.css"
import { MdOutlineVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const BookingConformation = () => {
    const Navigate = useNavigate();

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <div data-aos="fade-down" className='Booking-Conformation'>
            <div data-aos="fade-down" className='Booking-Conformation-Container'>
                <MdOutlineVerified />
                <div data-aos="fade-down" className='Booking-Conformation-Container-text'>
                    <h2>Booking Confirmed!</h2>
                    <p>Your service has been successfully booked.</p>
                </div>
                <div className="Booking-Conformation-Container-button">
                    <button className='confirm-button' onClick={() => { Navigate('/'), handleClick() }}>Go To Home</button>
                    <button className='confirm-button' onClick={() => { Navigate('/Current-Booking'), handleClick() }}>View Booking Details</button>
                </div>
            </div>
        </div>
    )
}

export default BookingConformation