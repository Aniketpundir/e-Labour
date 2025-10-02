import React, { useContext } from 'react'
import "./WorkerDetailHeader.css"
import { FaCheckCircle } from "react-icons/fa";
import image from "../../../../../assets/101.jpg"
import { useNavigate, useParams } from 'react-router-dom';
import WorkerAvaiable from '../WorkerAvaiable/WorkerAvaiable';
import { StoreContext } from '../../../../../Context/StoreContext';

const WorkerDetailHeader = () => {
    const { workerDetails } = useContext(StoreContext);

    // console.log(workerDetails);
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
        <div data-aos="fade-down" className="worker-card">
            <img
                src={workerDetails?.worker?.workerId?.avatar?.image}
                alt="Worker"
                className="worker-image"
            />
            <div className="worker-info">
                <h3 className="worker-name">{workerDetails?.worker?.workerId?.name}</h3>
                <p className="worker-details">{workerDetails?.worker?.workCategory} · {workerDetails?.worker?.experience} years of experience</p>
                <p className="worker-details" style={{ fontSize: "18px", fontWeight: "600" }}>{workerDetails?.worker?.rate}</p>
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