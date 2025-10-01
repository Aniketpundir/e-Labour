import React, { useState } from 'react'
import "./WorkerAvaiable.css"
import { useScroll } from 'framer-motion'

const WorkerAvaiable = () => {

    const [active, setActive] = useState("");

    const today = new Date();
    const tomorrow = new Date();
    const dayAfterTomorrow = new Date();

    // Dates ko update karna
    tomorrow.setDate(today.getDate() + 1);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    // Format date (DD-MM-YYYY)
    const formatDate = (date) => {
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        return `${d}-${m}-${y}`;
    };

    return (
        <div data-aos="fade-up" className='Availablity'>
            <div data-aos="fade-up" className='Availablity-containt'>
                <h3>Availablity</h3>
                <hr data-aos="fade-up" />
                <ul>
                    <li data-aos="fade-up" className={`statuss ${active === "today" ? "availablity" : "unavailablity"}`}>
                        Today: {formatDate(today)}
                    </li>
                    <hr data-aos="fade-up" />
                    <li data-aos="fade-up" className={`statuss ${active === "tomorrow" ? "availablity" : "unavailablity"}`}>
                        Tomorrow: {formatDate(tomorrow)}
                    </li>
                    <hr data-aos="fade-up" />
                    <li data-aos="fade-up" className={`statuss ${active === "dayAfter" ? "availablity" : "unavailablity"}`}>
                        Day after: {formatDate(dayAfterTomorrow)}
                    </li>
                    <hr data-aos="fade-up" />
                </ul>
            </div>
        </div >
    )
}

export default WorkerAvaiable
