import React from 'react'
import "./WorkerProfile.css";
import LeftSideProfile from './LeftSideProfile/LeftSideProfile'
import RightSideProfile from './RightSideProfile/RightSideProfile';

const WokerProfile = () => {
    return (
        <div className='worker-profile'>
            <LeftSideProfile />
            <RightSideProfile />
        </div>
    )
}

export default WokerProfile