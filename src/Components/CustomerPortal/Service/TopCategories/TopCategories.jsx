import React from 'react'
import "./TopCategories.css"
import image1 from "../../../../assets/Plumber.jpeg"
import image2 from "../../../../assets/Electrician.jpeg"
import image3 from "../../../../assets/Painter.jpeg"
import image4 from "../../../../assets/Carpenter.jpeg"
import ServiceCard from '../ServiceCard/ServiceCard'

const service = [
    {
        _id: "1",
        title: "Plumber",
        img: image1,
    },
    {
        _id: "2",
        title: "Electrician",
        img: image2,
    },
    {
        _id: "3",
        title: "Painter",
        img: image3,
    },
    {
        _id: "4",
        title: "Carpenter",
        img: image4,
    },
]

const TopCategories = () => {
    return (
        <>
            <div className='Top-service'>
                <h1>Service Categories</h1>
                <div className='Top-Category'>
                    {service.map((items, index) => {
                        return (
                            <div key={index} className='Top-Categories'>
                                <ServiceCard
                                    img={items.img}
                                    title={items.title}
                                />
                            </div>
                        )
                    })}
                </div>
                <button>More Service...</button>
            </div>
        </>
    )
}

export default TopCategories