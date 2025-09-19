import React from 'react'
import "./WorkerDetailHeader.css"
import { FaCheckCircle } from "react-icons/fa";
import image from "../../../../../assets/101.jpg"
import { useNavigate, useParams } from 'react-router-dom';
import WorkerAvaiable from '../WorkerAvaiable/WorkerAvaiable';

const WorkerDetailHeader = () => {

    const { title, id } = useParams();

    const Navigate = useNavigate();

    const handleClick = () => {
        Navigate(`/Service-Categories/Listed-Workers/${title}/Worker-Details/${id}/Booking-Section`);
    }

    const handleClicked = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

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
            <button onClick={() => { handleClick(), handleClicked() }} className="book-button">Book Worker</button>
        </div>
    );
};


export default WorkerDetailHeader