import React from 'react';
import './PersonalInformation.css';

const PersonalInformation = () => {
    const personalData = [
        { label: 'Full Name', value: 'John Doe' },
        { label: 'Email Address', value: 'john.doe@example.com' },
        { label: 'Phone Number', value: '+1 234 567 890' },
        { label: 'Location', value: 'San Francisco, CA' },
    ];

    return (
        <div className="info-card">
            <h2>Personal Information</h2>
            <div className="info-grid">
                {personalData.map((item, index) => (
                    <div key={index} className="info-item">
                        <div className="info-label">{item.label}</div>
                        <div className="info-value">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalInformation;