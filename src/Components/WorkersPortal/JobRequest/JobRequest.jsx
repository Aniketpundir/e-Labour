import React from 'react'
import "./JobRequest.css"
import JobRequestCard from './JobRequestCard/JobRequestCard';


const jobRequestsData = [
    {
        id: 1,
        title: 'Event Photography',
        postedBy: 'Sophia Carter',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Photography, Event Coverage',
        location: '123 Maple Street, Anytown',
        timeLeft: '15m 30s',
    },
    {
        id: 2,
        title: 'Website Design',
        postedBy: 'Ethan Bennett',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example avatar
        category: 'UI/UX Design, Web Development',
        location: '456 Oak Avenue, Anytown',
        timeLeft: '10m 15s',
    },
    {
        id: 3,
        title: 'Social Media Management',
        postedBy: 'Olivia Green',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example avatar
        category: 'Marketing, Content Creation',
        location: '789 Pine Road, Anytown',
        timeLeft: '25m 00s',
    },
];


const JobRequest = () => {
    return (
        <div className="job-requests-page">
            <h1 className="page-title">Job Requests</h1>

            <div className="notification-banner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bell-icon">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span>You have 3 new job requests waiting for your response!</span>
                <button className="view-all-button">View All</button>
            </div>

            <div className="job-cards-list">
                {jobRequestsData.map((job) => (
                    <JobRequestCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    )
}

export default JobRequest