import React from 'react';
import './JobRequestCard.css'; // Make sure to create this CSS file

const JobRequestCard = ({ job }) => {
    return (
        <div className="job-card">
            <div className="job-card-header">
                <div className="poster-info">
                    {/* Using a placeholder image for the avatar */}
                    <img src={job.avatarUrl || 'https://via.placeholder.com/40'} alt={job.postedBy} className="poster-avatar" />
                    <div className="text-info">
                        <div className="job-title">{job.title}</div>
                        <div className="posted-by">Posted by {job.postedBy}</div>
                    </div>
                </div>
            </div>

            <div className="job-card-body">
                <div className="job-details">
                    <div className="detail-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                        <span>{job.category}</span>
                    </div>
                    <div className="detail-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{job.location}</span>
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