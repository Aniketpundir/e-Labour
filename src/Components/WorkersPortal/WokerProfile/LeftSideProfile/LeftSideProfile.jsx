import React, { useContext } from 'react'
import "./LeftSideProfile.css";
import profileImage from "../../../../assets/101.jpg"
import { MdOutlineVerified } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { StoreContext } from '../../../../Context/StoreContext';

const LeftSideProfile = () => {
    const { workerProfileData } = useContext(StoreContext);

    return (
        <>
            <div className='left-side-profile-container'>
                <div className='worker-left-side-details'>
                    <div className='name-and-image-container'>
                        <div className='worker-profile-image'>
                            <img src={workerProfileData.workerId && workerProfileData.workerId.avatar && workerProfileData.workerId.avatar.image} alt='Worker Profile Image' />
                        </div>
                        <div className='worker-name'>
                            <p>{workerProfileData?.workCategory || <p>.</p>}</p>
                            <p>Experience: {workerProfileData?.experience || <p>.</p>} years</p>
                            <p>Rate: {workerProfileData?.rate || <p>.</p>}/Day</p>
                            <p>Timing: {workerProfileData?.workingHr || <p>.</p>}</p>
                            <span><MdOutlineVerified /> verified</span>
                        </div>
                        <button> <CiEdit /> Profile</button>
                    </div>
                    <div className='worker-about'>
                        <h3>About</h3>
                        <p>{workerProfileData?.bio || <p>.</p>}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftSideProfile