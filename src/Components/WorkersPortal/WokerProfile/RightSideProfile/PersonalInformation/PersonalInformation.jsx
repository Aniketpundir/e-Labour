import React, { useContext } from 'react';
import './PersonalInformation.css';
import { StoreContext } from "../../../../../Context/StoreContext"

const PersonalInformation = () => {

    const { workerProfileData } = useContext(StoreContext)
    const personalData = [
        { label: 'Full Name', value: 'John Doe' },
        { label: 'Email Address', value: 'john.doe@example.com' },
        { label: 'Phone Number', value: '+1 234 567 890' },
        { label: 'Location', value: 'San Francisco, CA' },
    ];

    // console.log(workerProfileData.address && workerProfileData.address.street)

    return (
        <>
            <div className="info-card">
                <h2>Personal Information</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label">Full Name</div>
                        <div className="info-value">{workerProfileData?.workerId?.name || "—"}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Date of Birth</div>
                        <div className="info-value">{workerProfileData?.dob || "—"}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Email</div>
                        <div className="info-value">{workerProfileData?.workerId?.email || "—"}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Phone Number</div>
                        <div className="info-value">{workerProfileData?.workerId?.phone || "—"}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Full Address</div>
                        <div className="info-value">{workerProfileData?.address
                            ? `${workerProfileData.address.street}, ${workerProfileData.address.city}, ${workerProfileData.address.state}, ${workerProfileData.address.zipCode}`
                            : "—"}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalInformation;