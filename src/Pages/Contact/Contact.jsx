import React, { useState } from 'react'
import "./Contact.css"
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";

const social = [
    {
        id: "1",
        icon: <FaInstagram />,
        social_name: "Instagram",
    },
    {
        id: "2",
        icon: <CiFacebook />,
        social_name: "Facebook",
    },
    {
        id: "3",
        icon: <FiTwitter />,
        social_name: "Twitter",
    },
    {
        id: "4",
        icon: <AiOutlineYoutube />,
        social_name: "Youtube",
    },
]



const Contact = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        messege: "",
    })

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const contactDetails = [
        {
            id: "1",
            title: "Address",
            description: "123 Innovation Drive, Tech City, CA 90210",
            icon: <IoLocationOutline />,
        },
        {
            id: "2",
            title: "Phone Number",
            description: "+1 (555) 123-45678",
            icon: <MdOutlineLocalPhone />,
        },
        {
            id: "3",
            title: "Email Address",
            description: "support@e-labour.com",
            icon: <MdOutlineEmail />,
        },
    ]

    return (
        <>
            <div className='contact'>
                <h1>Get In Touch</h1>
                <p className='heading'>Have questions? We're here to help.</p>
                <div className='contact-container'>
                    <div className='contact-left'>
                        <form>
                            <input type='text' value={data.name} name='name' onChange={handleChange} placeholder='Name' required />

                            <input type='email' value={data.email} name='email' onChange={handleChange} placeholder='E-mail' required />

                            <input type='text' value={data.mobile} name='mobile' onChange={handleChange} placeholder='Mobile' required />

                            <textarea rows={10} cols={30} placeholder='Messege' value={data.messege} name='messege' onChange={handleChange} required></textarea>
                            <button>Submit</button>
                        </form>
                    </div>
                    <div className='contact-right'>
                        <div className='Content-detail'>
                            <h3>Contact details</h3>
                            {contactDetails.map((items, index) => {
                                return (
                                    <div key={index} className='Content-details'>
                                        <div className='address'>
                                            <p>{items.icon}</p>
                                            <h6>{items.title}</h6>
                                        </div>
                                        <p>{items.description}</p>
                                    </div>
                                )

                            })}
                        </div>
                        <div className='socila-media'>
                            {social.map((items, index) => {
                                return (
                                    <div key={index} className='social'>
                                        <p>{items.icon} -- <span>{items.social_name}</span></p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact