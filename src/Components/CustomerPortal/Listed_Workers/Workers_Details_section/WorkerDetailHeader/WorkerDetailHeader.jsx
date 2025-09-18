import React from 'react'
import "./WorkerDetailHeader.css"
import { FaCheckCircle } from "react-icons/fa";
import image from "../../../../../assets/101.jpg"
import { useParams } from 'react-router-dom';

const WorkerDetailHeader = () => {

    const { title } = useParams();

    return (
        <div className="worker-card">
            <img
                src={image}
                alt="Worker"
                className="worker-image"
            />
            <div className="worker-info">
                <h3 className="worker-name">Ethan Carter</h3>
                <p className="worker-details">{title} · 5 years of experience</p>
                <div className="verified">
                    <FaCheckCircle className="verified-icon" />
                    <span>Verified</span>
                </div>
            </div>
            <button className="book-button">Book Worker</button>
        </div>
    );
};


export default WorkerDetailHeader