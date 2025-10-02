import React, { useContext, useState } from 'react'
import "./WorkerAvaiable.css"
import { StoreContext } from '../../../../../Context/StoreContext'

const WorkerAvaiable = () => {
    const { workerDetails } = useContext(StoreContext)

    const today = new Date();
    const tomorrow = new Date();
    const dayAfterTomorrow = new Date();

    // Dates update
    tomorrow.setDate(today.getDate() + 1);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, "0");
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const y = date.getFullYear();
        return `${y}-${m}-${d}`;
    };

    // Worker ke scheduled dates (array of strings ko YYYY-MM-DD me convert karo)
    const bookedDates = workerDetails?.scheduledDate?.map(d =>
        new Date(d).toLocaleDateString("en-CA")
    ) || [];

    // Helper: check if date booked hai
    const isBooked = (date) => bookedDates.includes(formatDate(date));

    return (
        <div data-aos="fade-up" className='Availablity'>
            <div data-aos="fade-up" className='Availablity-containt'>
                <h3>Availablity</h3>
                <hr data-aos="fade-up" />
                <ul>
                    <li
                        data-aos="fade-up"
                        onClick={() => setBookingDate(formatDate(today))}
                        className={`statuss ${isBooked(today) ? "unavailablity" : "availablity"}`}
                    >
                        Today: {formatDate(today)}
                    </li>
                    <hr data-aos="fade-up" />

                    <li
                        data-aos="fade-up"
                        onClick={() => setBookingDate(formatDate(tomorrow))}
                        className={`statuss ${isBooked(tomorrow) ? "unavailablity" : "availablity"}`}
                    >
                        Tomorrow: {formatDate(tomorrow)}
                    </li>
                    <hr data-aos="fade-up" />

                    <li
                        data-aos="fade-up"
                        onClick={() => setBookingDate(formatDate(dayAfterTomorrow))}
                        className={`statuss ${isBooked(dayAfterTomorrow) ? "unavailablity" : "availablity"}`}
                    >
                        Day after: {formatDate(dayAfterTomorrow)}
                    </li>
                    <hr data-aos="fade-up" />
                </ul>
            </div>
        </div>
    )
}

export default WorkerAvaiable
