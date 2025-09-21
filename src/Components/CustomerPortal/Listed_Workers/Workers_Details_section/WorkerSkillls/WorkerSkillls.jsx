import React from 'react'
import "./WorkerSkillls.css"

const WorkerSkillls = () => {
    const skills = [
        "Pipe Installation",
        "Leak Detection & Repair",
        "Drain Cleaning",
        "Fixture Repair & Installation",
        "Water Heater Services",
        "Residential Plumbing",
        "Commercial Plumbing"
    ];

    return (
        <div data-aos="fade-down" className="skills-card">
            <h3 data-aos="fade-down" className="skills-title">Skills</h3>
            <div data-aos="fade-down" className="skills-list">
                {skills.map((skill, index) => (
                    <span data-aos="fade-down" key={index} className="skill-badge">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default WorkerSkillls