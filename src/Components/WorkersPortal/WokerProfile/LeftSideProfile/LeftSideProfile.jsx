import React, { useContext } from 'react';
import "./LeftSideProfile.css";
import { MdOutlineVerified } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { StoreContext } from '../../../../Context/StoreContext';

const LeftSideProfile = () => {
    const { workerProfileData } = useContext(StoreContext);

    return (
        <div className='left-side-profile-container'>
            <div className='worker-left-side-details'>
                <div className='name-and-image-container'>
                    <div className='worker-profile-image'>
                        <img
                            src={
                                workerProfileData?.workerId?.avatar?.image || "https://via.placeholder.com/150"
                            }
                            alt='Worker Profile Image'
                        />
                    </div>
                    <div className='worker-name'>
                        <p>{workerProfileData?.workCategory || "."}</p>
                        <p>Experience: {workerProfileData?.experience || "."} years</p>
                        <p>Rate: {workerProfileData?.rate || "."}/Day</p>
                        <p>Timing: {workerProfileData?.workingHr || "."}</p>
                        <span><MdOutlineVerified /> verified</span>
                    </div>
                    <button><CiEdit /> Profile</button>
                </div>
                <div className='worker-about'>
                    <h3>About</h3>
                    <p>{workerProfileData?.bio || "."}</p>
                </div>
            </div>
        </div>
    );
}

export default LeftSideProfile;
