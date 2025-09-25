import React from 'react'
import "./RightSideProfile.css"
import PersonalInformation from './PersonalInformation/PersonalInformation'
import SkillsAndServices from './SkillsAndServices/SkillsAndServices'
import WorkHistoryAndReviews from './WorkHistoryAndReviews/WorkHistoryAndReviews'


const RightSideProfile = () => {
    return (
        <div className='right'>
            <PersonalInformation />
            <SkillsAndServices />
            <WorkHistoryAndReviews />
        </div>
    )
}

export default RightSideProfile