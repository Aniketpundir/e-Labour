import React from 'react'
import "./HowItWork.css";
import { IoMdSearch } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


const HowItWork = () => {

    const howDetails = [
        {
            icon: <IoMdSearch />,
            id: "1",
            title: "Select service for Worker",
            description: "Find the right professional for your needs with our easy-to-use search.",
        },
        {
            icon: <SlCalender />,
            id: "2",
            title: "Schedule Your Service",
            description: "Book a convenient time for your service, and we'll handle the rest.",
        },
        {
            icon: <IoCheckmarkDoneCircleOutline />,
            id: "3",
            title: "Get the Job Done",
            description: "Enjoy a job well done by a trusted and verified worker.",
        },
    ]

    return (
        <>
            <div className='HowItWork-container'>
                <h1 data-aos="fade-up">How It Work</h1>
                <div className='HowItWork-content'>
                    {howDetails.map((items, index) => {
                        return (
                            <div key={index} data-aos="fade-up" className='HowItWork-main-content'>
                                <div className='HowItWork-logo'>
                                    {items.icon}
                                </div>
                                <div className='HowItWork-text'>
                                    <div>
                                        <h2>{items.id}. {items.title}</h2>
                                        <p>{items.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        </>
    )
}

export default HowItWork