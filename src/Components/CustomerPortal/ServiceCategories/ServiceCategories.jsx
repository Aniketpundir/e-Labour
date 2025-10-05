import React, { useState } from 'react'
import "./ServiceCategories.css"
import Carpenter from "../../../assets/Carpenter.jpeg"
import Electrician from "../../../assets/Electrician.jpeg"
import Painter from "../../../assets/Painter.jpeg"
import Plumber from "../../../assets/Plumber.jpeg"
import Appliance from "../../../assets/Appliance.png";
import Electrical from "../../../assets/Electrical.png";
import gardening from "../../../assets/gardening.png";
import Home_cleaning from "../../../assets/Home_cleaning.png";
import Pest_Control from "../../../assets/Pest_Control.png";
import painting_service from "../../../assets/painting_service.png"
import Handyman from "../../../assets/Handyman.png"
import ServiceCard from '../Home_Section/Service/ServiceCard/ServiceCard';
import image4 from "../../../assets/chock_labour.jpeg"

const Servce_List = [
    {
        _id: "1",
        title: "Chowk Laborers",
        img: image4,
        description: "Hands Covered in Dust, Hearts Full of Dreams.",
    },
    {
        id: "2",
        img: Plumber,
        title: "Plumber",
        description: "Expert plumbing solutions for your home."
    },
    {
        id: "3",
        img: Electrician,
        title: "Electrician",
        description: "Reliable wiring and repairs you can trust."
    },
    {
        id: "4",
        img: Painter,
        title: "Painter",
        description: "Bring your walls to life with expert painting."
    },
    {
        id: "5",
        img: Carpenter,
        title: "Carpenter",
        description: "From fixes to fine furniture, we build with care."
    },
    {
        id: "6",
        img: Home_cleaning,
        title: "Home Cleaning",
        description: "Deep cleaning services for a healthier home."
    },
    {
        id: "7",
        img: Electrical,
        title: "Electrical",
        description: "Reliable electrical repair services."
    },
    {
        id: "8",
        img: gardening,
        title: "Gardening",
        description: "Professional gardening to keep your greens thriving."
    },
    {
        id: "9",
        img: Appliance,
        title: "Appliance Repair",
        description: "Fast and efficient appliance repairs."
    },
    {
        id: "10",
        img: painting_service,
        title: "Painting Service",
        description: "“Reliable painters bringing vibrant life to your space."
    },
    {
        id: "11",
        img: Pest_Control,
        title: "Pest Control",
        description: "Effective pest control solutions."
    },
    {
        id: "12",
        img: Handyman,
        title: "Painting Service",
        description: "All rounder home repair services."
    },
]


const ServiceCategories = () => {

    return (
        <>
            <div className='service-categories'>
                <div data-aos="fade-down" className='service-categories-hero-image-text'>
                    <h1>Find Trusted Services Effortlessly.</h1>
                    <p>Your one-stop solution for reliable household help. Get it done right.</p>
                </div>
                <div className='service-categories-container'>

                    <div className='service-categories-list'>
                        {Servce_List.map((items, index) => {
                            return (
                                <div data-aos="fade-up" key={index} className='service-categories-list-card'>
                                    <ServiceCard
                                        img={items.img}
                                        title={items.title}
                                        description={items.description}
                                    />
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceCategories