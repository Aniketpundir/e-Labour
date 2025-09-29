import React, { useContext } from 'react';
import './SkillsAndServices.css';
import { StoreContext } from "../../../../../Context/StoreContext"

const SkillsAndServices = () => {
    const { workerProfileData } = useContext(StoreContext)

    const services = workerProfileData?.skills || [];
    const workCategory = workerProfileData?.workCategory || "Not specified";

    return (
        <div className="info-card">
            <h2>Skills & Services</h2>

            <div className="section-group">
                <h3>Working Category</h3>
                <div className="skills-tags">
                    <span className="skill-tag">
                        {workCategory}
                    </span>
                </div>
            </div>

            <div className="section-group">
                <h3>Services Offered</h3>
                <ul className="services-list">
                    {services.map((service, index) => (
                        <li key={index}>{service}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SkillsAndServices;