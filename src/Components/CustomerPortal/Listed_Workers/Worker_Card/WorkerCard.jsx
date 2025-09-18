import React from 'react';
import "./WorkerCard.css";

const WorkerCard = ({ image, name, service, rating, daily_wages, status }) => {
    const isAvailable = status === "Availabel"; // Match your status string

    return (
        <div className='Worker-Card'>
            <div className='Worker-Card-Details'>
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
                    <p className='service'>{service}</p>
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
