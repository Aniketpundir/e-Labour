import React from 'react'
import "./How_Work.css";
import { IoMdSearch } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaWrench } from "react-icons/fa6";

const How_Works = [
    {
        id: "1",
        icon: <IoMdSearch />,
        title: "Search Worker",
        description: "Use our intuitive search filters to find skilled and reliable workers in your area. Specify the job category, your location, and desired schedule to get a list of qualified professionals ready to help."
    },
    {
        id: "2",
        icon: <FaListCheck />,
        title: "Compare & Select",
        description: "Easily browse through detailed worker profiles. Read authentic reviews from previous clients, compare their skills, experience, and transparent quotes to select the perfect match for your specific requirements."
    },
    {
        id: "3",
        icon: <FaCalendarDays />,
        title: "Book Instantly",
        description: "Once you've made your choice, schedule your service directly on our secure platform. Pick a date and time that works for you. It's a fast, convenient, and completely hassle-free booking process."
    },
    {
        id: "4",
        icon: <FaWrench />,
        title: "Work Done",
        description: "After the worker has successfully completed the job to your satisfaction, you can finalize the payment securely through the platform. Leave a review to help others in the community."
    },
]

const How_Work = () => {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <>
            <div className='How-Works'>
                <div className='How-Works-content'>
                    {How_Works.map((items, index) => {
                        return (
                            <div data-aos="fade-up" key={index} className='How-Works-container'>
                                <span>{items.icon}</span>
                                <h3>{items.id}. {items.title}</h3>
                                <p>{items.description}</p>
                            </div>
                        )
                    })}
                </div>
                <button data-aos="fade-down" onClick={() => {
                    handleClick()
                }}>Find a Worker Now</button>
            </div>
        </>
    )
}

export default How_Work