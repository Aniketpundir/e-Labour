import React, { useState } from 'react'
import "./WorkerAvaiable.css"
import { useScroll } from 'framer-motion'

const WorkerAvaiable = () => {

    const [active, setActive] = useState("");

    return (
        <>
            <div data-aos="fade-up" className='Availablity'>
                <div data-aos="fade-up" className='Availablity-containt'>
                    <h3>Availablity</h3>
                    <hr data-aos="fade-up" />
                    <ul>
                        <li data-aos="fade-up" className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}> Today</li>
                        <hr data-aos="fade-up" />
                        <li data-aos="fade-up" className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}>Tomorrow</li>
                        <hr data-aos="fade-up" />
                        <li data-aos="fade-up" className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}>Day of Tomorrow</li>
                        <hr data-aos="fade-up" />
                    </ul>
                </div>
            </div >
        </>
    )
}

export default WorkerAvaiable