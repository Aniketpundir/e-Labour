import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import "./ListedWorkers.css";
import WorkerCard from '../Worker_Card/WorkerCard';
import image from "../../../../assets/image.jpeg";
import image1 from "../../../../assets/101.jpg";

const worker_details = [
    {
        id: "1",
        img: image1,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Unavailabel"
    },
    {
        id: "2",
        img: image,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Availabel"
    },
    {
        id: "3",
        img: image,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Availabel"
    },
    {
        id: "4",
        img: image,
        name: "Liam Carter",
        service: "Plumber",
        rating: "4.5",
        daily_wages: "500",
        status: "Availabel"
    },
    {
        id: "5",
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
                <div className='ListedWorker-text'>
                    <h1>Find a Worker</h1>
                    <p>Brower our network of trusted professionals.</p>
                </div>
                <div className='ListedWorker-filter'>
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
                            <div key={index} className='ListedWorkrs-card-list'>
                                <WorkerCard
                                    image={items.img}
                                    name={items.name}
                                    service={items.service}
                                    rating={items.rating}
                                    daily_wages={items.daily_wages}
                                    status={items.status}
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