import React from 'react';
import './SkillsAndServices.css';

const SkillsAndServices = () => {
    const skills = ['Plumbing', 'Electrical', 'Carpentry', 'Repair', 'Maintenance'];
    const services = [
        'Leaky faucet repair',
        'Light fixture installation',
        'Custom shelving',
        'Circuit breaker replacement',
    ];

    return (
        <div className="info-card">
            <h2>Skills & Services</h2>

            <div className="section-group">
                <h3>Skills</h3>
                <div className="skills-tags">
                    {skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                            {skill}
                        </span>
                    ))}
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