import React, { useState } from 'react'
import "./WorkerAvaiable.css"
import { useScroll } from 'framer-motion'

const WorkerAvaiable = () => {

    const [active, setActive] = useState("");

    return (
        <>
            <div data-aos="fade-down" className='Availablity'>
                <div data-aos="fade-down" className='Availablity-containt'>
                    <h3>Availablity</h3>
                    <hr data-aos="fade-down" />
                    <ul>
                        <li data-aos="fade-down" className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}> Today</li>
                        <hr data-aos="fade-down" />
                        <li data-aos="fade-down" className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}>Tomorrow</li>
                        <hr data-aos="fade-down" />
                        <li data-aos="fade-down" className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}>Day of Tomorrow</li>
                        <hr data-aos="fade-down" />
                    </ul>
                </div>
            </div >
        </>
    )
}

export default WorkerAvaiable