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
        <div className="skills-card">
            <h3 className="skills-title">Skills</h3>
            <div className="skills-list">
                {skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default WorkerSkillls