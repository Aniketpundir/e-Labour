import React from 'react'
import "./About_Features.css"
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";

const About_Feature = [
    {
        id: "1",
        title: "Verified Workers",
        icon: <MdOutlineVerifiedUser style={{ background: "Blue" }} />,
        description: "Your peace of mind is our priority. Every worker on our platform undergoes a rigorous multi-step verification process, including background checks and skill assessments. This ensures that you are hiring not just a skilled professional, but a trustworthy individual committed to quality workmanship.",
    },
    {
        id: "2",
        title: "Affordable & Transparent Pricing",
        icon: <MdOutlinePayments style={{ background: "orange" }} />,
        description: "We believe in fair and upfront pricing. Our platform provides clear cost breakdowns before you book, eliminating hidden fees and surprises. Get competitive rates from skilled professionals, ensuring you receive the best value for your investment without compromising on quality.",
    },
    {
        id: "3",
        title: "Instant Booking",
        icon: <IoFlashOutline style={{ background: "Blue" }} />,
        description: "Time is valuable. Our streamlined booking system allows you to find and hire skilled workers in just a few clicks. Check real-time availability, select your preferred professional, and receive instant confirmation. It’s fast, convenient, and designed for your busy lifestyle.",
    },
]

const About_Features = () => {
    return (
        <>
            <div className='About_Features'>
                {About_Feature.map((items, index) => {
                    return (
                        <div data-aos="fade-down" key={index} className='About_Features-content'>
                            <span>{items.icon}</span>
                            <h3>{items.title}</h3>
                            <p>{items.description}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default About_Features