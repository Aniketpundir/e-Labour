import React from 'react'
import "./LeftSideProfile.css";
import profileImage from "../../../../assets/101.jpg"
import { MdOutlineVerified } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const LeftSideProfile = () => {
    return (
        <>
            <div className='left-side-profile-container'>
                <div className='worker-left-side-details'>
                    <div className='name-and-image-container'>
                        <div className='worker-profile-image'>
                            <img src={profileImage} alt='Worker Profile Image' />
                        </div>
                        <div className='worker-name'>
                            <h2>John Deo</h2>
                            <p>Plumber</p>
                            <span><MdOutlineVerified /> verified</span>
                        </div>
                        <button> <CiEdit /> Profile</button>
                    </div>
                    <div className='worker-about'>
                        <h3>About</h3>
                        <p>Dedicated and experienced professional with a proven track record in plumbing and electrical work. Committed to providing high-quality service and ensuring customer satisfaction.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftSideProfile