import React from 'react'
import "./JobRequest.css"
import JobRequestCard from './JobRequestCard/JobRequestCard';
import { StoreContext } from '../../../Context/StoreContext';
import { useContext } from 'react';

const JobRequest = () => {
    const { jobRequest } = useContext(StoreContext);
    return (
        <div className="job-requests-page">
            <h1 className="page-title">Job Requests</h1>
            <div className="job-cards-list">
                {jobRequest.map((job, index) => (
                    <JobRequestCard key={index} job={job} />
                ))}
            </div>
        </div>
    )
}

export default JobRequest