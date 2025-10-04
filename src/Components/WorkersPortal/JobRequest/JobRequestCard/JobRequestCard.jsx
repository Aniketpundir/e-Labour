import React from 'react';
import './JobRequestCard.css'; // Make sure to create this CSS file

const JobRequestCard = ({ job }) => {
    console.log(job)
    return (
        <div className="job-card">
            <div className="job-card-header">
                <div className="poster-info">
                    <img src={job?.customerId?.avatar?.image} alt={job?.customerId?.name} className="poster-avatar" />
                    <div className="text-info">
                        <div className="job-title">{job.serviceType}</div>
                        <div className="posted-by">Posted by {job?.customerId?.name}</div>
                    </div>
                </div>
            </div>

            <div className="job-card-body">
                <div className="job-details">
                    <div className="detail-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{job.location.street}, {job.location.city}, {job.location.state} - ({job.location.zipCode})</span>
                    </div>
                </div>
            </div>

            <div className="job-card-footer">
                <div className="actions">
                    <button className="reject-button">Reject</button>
                    <button className="accept-button">Accept</button>
                </div>
            </div>
        </div>
    );
};

export default JobRequestCard;