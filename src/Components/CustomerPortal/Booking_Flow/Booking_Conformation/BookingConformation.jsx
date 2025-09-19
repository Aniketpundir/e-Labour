import React, { useState } from 'react'
import "./BookingConformation.css"
import { MdOutlineVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const BookingConformation = () => {
    const Navigate = useNavigate();

    return (
        <div className='Booking-Conformation'>
            <div className='Booking-Conformation-Container'>
                <MdOutlineVerified />
                <div className='Booking-Conformation-Container-text'>
                    <h2>Booking Confirmed!</h2>
                    <p>Your service has been successfully booked.</p>
                </div>
                <div className="Booking-Conformation-Container-button">
                    <button className='confirm-button' onClick={() => { Navigate('/') }}>Go To Home</button>
                    <button className='confirm-button' onClick={() => { Navigate('/about') }}>View Booking Details</button>
                </div>
            </div>
        </div>
    )
}

export default BookingConformation