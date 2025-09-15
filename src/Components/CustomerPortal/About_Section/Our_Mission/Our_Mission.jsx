import React from 'react'
import "./Our_Mission.css"
import { MdVerified } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineSpeed } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";

const Our_Mission = () => {
    const OurMission = [
        {
            id: "1",
            icon: <MdVerified />,
            title: "Trust",
        },
        {
            id: "2",
            icon: <FaRegEye />,
            title: "Transparency",
        },
        {
            id: "2",
            icon: <MdOutlineSpeed />,
            title: "Efficiency",
        },
        {
            id: "1",
            icon: <RiUserCommunityLine />,
            title: "Community",
        },
    ];
    return (
        <>
            <div className='Our_Mission'>
                <div className='Our_Mission-content'>
                    <div className='Our_Mission-left'>
                        <h3>Our Mission</h3>
                        <p>Welcome to Digital Labour Chock, your premier destination for connecting with skilled and reliable workers effortlessly. Our platform is meticulously designed to bridge the gap between customers seeking quality services and professionals ready to deliver. We are committed to fostering a community built on trust, transparency, and efficiency, making it easier than ever to find the right person for the job. Our core mission is to empower both customers and workers by creating a seamless, fair, and accessible digital marketplace for labour.</p>
                        <p>We strive to eliminate the traditional hassles of finding work or hiring help, replacing them with a streamlined process that values time, skill, and reliability above all else.</p>
                    </div>
                    <div className='Our_Mission-right'>
                        {OurMission.map((items, index) => {
                            return (
                                <div key={index} className='Our_Mission-right-content'>
                                    <p>{items.icon}</p>
                                    <h3>{items.title}</h3>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Our_Mission