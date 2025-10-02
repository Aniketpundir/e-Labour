import React, { useContext } from 'react'
import "./WorkerAbout.css"
import { StoreContext } from '../../../../../Context/StoreContext';

const WorkerAbout = () => {
    const { workerDetails } = useContext(StoreContext);

    console.log()
    return (
        <div data-aos="fade-up" className="about-card">
            <h3 data-aos="fade-up" className="about-title">About Me</h3>
            <p data-aos="fade-up" className="about-text">
                {
                    workerDetails?.worker?.bio
                }
            </p>
        </div>
    );
}

export default WorkerAbout