import React, { useState } from 'react'
import "./WorkerAvaiable.css"
import { useScroll } from 'framer-motion'

const WorkerAvaiable = () => {

    const [active, setActive] = useState("");

    return (
        <>
            <div className='Availablity'>
                <div className='Availablity-containt'>
                    <h3>Availablity</h3>
                    <hr />
                    <ul>
                        <li className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}> Today</li>
                        <hr />
                        <li className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}>Tomorrow</li>
                        <hr />
                        <li className={`statuss ${active === "Availablity" ? "availablity" : "unavailablity"}`}>Day of Tomorrow</li>
                        <hr />
                    </ul>
                </div>
            </div >
        </>
    )
}

export default WorkerAvaiable