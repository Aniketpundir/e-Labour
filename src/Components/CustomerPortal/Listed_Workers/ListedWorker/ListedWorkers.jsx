import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import "./ListedWorkers.css";
import WorkerCard from '../Worker_Card/WorkerCard';
import image from "../../../../assets/image.jpeg";
import image1 from "../../../../assets/101.jpg";

const worker_details = [
    {
        _id: "651f9a7b12a4cde5f8b3210d",
        img: image1,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Unavailabel"
    },
    {
        _id: "752e1b4d93f5a6c7d8e4201f",
        img: image,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Availabel"
    },
    {
        _id: "8c2d7e5a41b9f0a3d6e8124b",
        img: image,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Availabel"
    },
    {
        _id: "5fa7c3e9b1d2e4f8a6c0217d",
        img: image,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Availabel"
    },
    {
        _id: "9e3a7b5f2d1c8a4e6f0312d9",
        img: image,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Availabel"
    },
]

const ListedWorkers = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <>
            <div className='ListedWorker'>
                <div data-aos="fade-down" className='ListedWorker-text'>
                    <h1>Find a Worker</h1>
                    <p>Brower our network of trusted professionals.</p>
                </div>
                <div data-aos="fade-down" className='ListedWorker-filter'>
                    <select defaultValue="" onClick={() => { handleClick() }} className="category-select" name="category">
                        <option value="" disabled onClick={() => { handleChange }}>Category</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                    {isOpen ? (
                        <FaCaretUp className="caret-icon" />
                    ) : (
                        <FaCaretDown className="caret-icon" />
                    )}
                </div>
                <div className='ListedWorker-card'>
                    {worker_details.map((items, index) => {
                        return (
                            <div data-aos="fade-up" key={index} className='ListedWorkrs-card-list'>
                                <WorkerCard
                                    image={items.img}
                                    name={items.name}
                                    service={items.service}
                                    rating={items.rating}
                                    daily_wages={items.daily_wages}
                                    status={items.status}
                                    id={items._id}
                                />
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default ListedWorkers