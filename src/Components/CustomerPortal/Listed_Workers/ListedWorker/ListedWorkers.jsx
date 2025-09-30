import React, { useContext, useEffect, useState } from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import "./ListedWorkers.css";
import WorkerCard from '../Worker_Card/WorkerCard';
import { useParams } from 'react-router-dom';
import { StoreContext } from "../../../../Context/StoreContext";
import axios from 'axios';

const ListedWorkers = () => {
    const { URL_LINK } = useContext(StoreContext)
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const { title } = useParams();

    const workCategory = title;

    const fetchWorkerList = async () => {
        let newUrl = `${URL_LINK}api/workers`;

        try {
            const res = await axios.get(newUrl, { params: { workCategory } });
            setData(res.data.workers);
        } catch (error) {
            console.log("Re-try again!", error);
        }
    }

    useEffect(() => {
        fetchWorkerList();
    }, []);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className='ListedWorker'>
            <div data-aos="fade-down" className='ListedWorker-text'>
                <h1>Find a Worker</h1>
                <p>Browse our network of trusted professionals.</p>
            </div>

            <div data-aos="fade-down" className='ListedWorker-filter'>
                <select defaultValue="" onClick={handleClick} className="category-select" name="category">
                    <option value="" disabled>Category</option>
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
                {data.length > 0 ? (
                    data.map((items, index) => (
                        <div data-aos="fade-up" key={index} className='ListedWorkrs-card-list'>
                            <WorkerCard
                                image={items.workerId?.avatar?.image}
                                name={items.workerId?.name}
                                service={items.workCategory}
                                daily_wages={items.rate}
                                id={items._id}
                            // status,rating
                            />
                        </div>
                    ))
                ) : (
                    <p>No workers found.</p>
                )}
            </div>
        </div>
    )
}

export default ListedWorkers;
