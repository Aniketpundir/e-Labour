import React from 'react'
import "./WorkersDetails.css";
import WorkerDetailHeader from '../WorkerDetailHeader/WorkerDetailHeader';
import WorkerAbout from '../WorkerAbout/WorkerAbout';
import WorkerSkillls from "../WorkerSkillls/WorkerSkillls"
import WorkerReview from '../WorkerReview/WorkerReview';
import WorkerAvaiable from "../WorkerAvaiable/WorkerAvaiable";

const WorkersDetails = () => {
    return (
        <>
            <WorkerDetailHeader />
            <div className='worker-detail'>
                <div className='worker-detail-left'>
                    <WorkerAbout />
                    <WorkerSkillls />
                    <WorkerReview />
                </div>
                <div className='worker-detail-right'>
                    <WorkerAvaiable />
                </div>
            </div>
        </>
    )
}

export default WorkersDetails