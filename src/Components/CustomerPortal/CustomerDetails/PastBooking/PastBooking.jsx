import React, { useContext } from 'react';
import "./PastBooking.css";
import image from "../../../../assets/101.jpg";
import { StoreContext } from '../../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PastBooking = () => {

    const { pastBookingWorkerList } = useContext(StoreContext);
    const Navigate = useNavigate();

    // console.log(pastBookingWorkerList);

    const navigate = (id, title) => {
        Navigate(`/Service-Categories/Listed-Workers/${title}/Worker-Details/${id}/Booking-Section`);
    };

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
                    {pastBookingWorkerList?.length > 0 ? (
                        pastBookingWorkerList.map((items, index) => (
                            <div data-aos="fade-up" key={index} className='past-booking-details'>
                                <img
                                    src={items?.workerId?.avatar?.image || image}
                                    alt='Worker Image'
                                />
                                <div className='booking-service'>
                                    <h3>{items?.serviceType || "Unknown Service"}</h3>
                                    <p>Worker : {items?.workerId?.name || "Not Available"}</p>
                                    <p>Amount Paid: &#8377; {items?.payment?.amount || 0}/Day</p>
                                </div>
                                <div className='past-booking-rebooking'>
                                    <button
                                        onClick={() => {
                                            handleClick();
                                            navigate(items?.workerId?._id, items?.serviceType);
                                        }}
                                    >
                                        &#x21bb; Rebook
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-booking">No past bookings found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default PastBooking;
