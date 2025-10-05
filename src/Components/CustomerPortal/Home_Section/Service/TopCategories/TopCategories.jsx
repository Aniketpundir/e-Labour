import React from 'react'
import "./TopCategories.css"
import image1 from "../../../../../assets/Plumber.jpeg"
import image2 from "../../../../../assets/Electrician.jpeg"
import image3 from "../../../../../assets/Painter.jpeg"
import image4 from "../../../../../assets/chock_labour.jpeg"
import ServiceCard from '../ServiceCard/ServiceCard'
import { useNavigate } from 'react-router-dom'

const service = [
    {
        _id: "1",
        title: "Chowk Laborers",
        img: image4,
        description: "Hands Covered in Dust, Hearts Full of Dreams.",
    },
    {
        _id: "2",
        title: "Plumber",
        img: image1,
        description: "Expert plumbing solutions for your home.",
    },
    {
        _id: "3",
        title: "Electrician",
        img: image2,
        description: "Reliable wiring and repairs you can trust."
    },
    {
        _id: "4",
        title: "Painter",
        img: image3,
        description: "Bring your walls to life with expert painting."
    },
]

const TopCategories = () => {

    const Navigate = useNavigate();

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <div className='Top-service'>
                <h1 data-aos="fade-up">Service Categories</h1>
                <div className='Top-Category'>
                    {service.map((items, index) => {
                        return (
                            <div key={index} data-aos="fade-up" className='Top-Categories'>
                                <ServiceCard
                                    img={items.img}
                                    title={items.title}
                                    description={items.description}
                                />
                            </div>
                        )
                    })}
                </div>
                <button onClick={() => { Navigate('/Service-Categories'), handleClick() }} className='more-service'>More Service...</button>
            </div>
        </>
    )
}

export default TopCategories