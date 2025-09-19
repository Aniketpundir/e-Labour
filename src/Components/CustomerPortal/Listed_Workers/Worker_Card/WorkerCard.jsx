import React from 'react';
import "./WorkerCard.css";
import { useNavigate, useParams } from 'react-router-dom';

const WorkerCard = ({ image, name, service, rating, daily_wages, status, id }) => {

    const Navigate = useNavigate();

    const token = localStorage.getItem("token")

    const handleClick = () => {
        if (token) {
            Navigate(`/Service-Categories/Listed-Workers/${title}/Worker-Details/${id}`)

        } else {
            Navigate('/customer-login');
            toast.error("Please login first!", {
                position: "bottom-left",
                autoClose: 5000,
            });
        }
    }

    const handleClicked = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const { title } = useParams();

    const isAvailable = status === "Availabel";

    return (
        <div className='Worker-Card'>
            <div onClick={() => { handleClick(), handleClicked() }} className='Worker-Card-Details'>
                <div className='Worker-Card-img'>
                    <img src={image} alt='Worker' />
                    <p className={`status ${isAvailable ? "availabel" : "unavailabel"}`}>
                        • {isAvailable ? "Availabel" : "Unavailabel"}
                    </p>
                </div>
                <div className='Worker-Card-text'>
                    <div className='name-with-avaiable'>
                        <h3>{name}</h3>
                    </div>
                    <p className='service'>{title}</p>
                    <div className='rating'>
                        <p className='rating-counting'>
                            <span>{rating}</span>/5
                        </p>
                        <p className='rating-text'>rating</p>
                    </div>
                    <div className='daily-wage'>
                        <h3>&#8377; {daily_wages}<span>/day</span></h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerCard;
