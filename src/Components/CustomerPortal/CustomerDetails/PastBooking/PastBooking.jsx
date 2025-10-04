import React, { useContext } from 'react'
import "./PastBooking.css";
import image from "../../../../assets/101.jpg";
import { StoreContext } from '../../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PastBooking = () => {

    const { pastbookingWorkerList } = useContext(StoreContext);

    const Navigate = useNavigate();

    const navigate = (id, title) => {
        Navigate(`/Service-Categories/Listed-Workers/${title}/Worker-Details/${id}/Booking-Section`)
    }

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <>
            <div data-aos="fade-down" className='past-booking'>
                <h1 data-aos="fade-down">Past Jobs</h1>
                <p data-aos="fade-down">Review your completed service history.</p>
                <div className='past-booking-history'>
                    {pastbookingWorkerList.map((items, index) => {
                        return (
                            <div data-aos="fade-up" key={index} className='past-booking-details'>
                                <img src={items?.workerId?.avatar?.image} alt='Worker Image' />
                                <div className='booking-service'>
                                    <h3>{items.serviceType}</h3>
                                    <p>Worker : {items.workerId.name}</p>
                                    <p>Amount Paid: &#8377; {items.payment.amount}</p>
                                </div>
                                <div className='past-booking-rebooking'>
                                    <button onClick={() => { handleClick(), navigate((items?.workerId?._id), (items.serviceType)) }}>&#x21bb; Rebook</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default PastBooking