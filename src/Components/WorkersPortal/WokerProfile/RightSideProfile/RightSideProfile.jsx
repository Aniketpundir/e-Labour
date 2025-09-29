import React from 'react'
import "./RightSideProfile.css"
import PersonalInformation from './PersonalInformation/PersonalInformation'
import SkillsAndServices from './SkillsAndServices/SkillsAndServices'
import Emergency from './Emergency/Emergency'


const RightSideProfile = () => {
    return (
        <div className='right'>
            <PersonalInformation />
            <SkillsAndServices />
            <Emergency />
        </div>
    )
}

export default RightSideProfile