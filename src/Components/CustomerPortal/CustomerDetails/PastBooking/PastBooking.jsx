import React from 'react'
import "./PastBooking.css";
import image from "../../../../assets/101.jpg";

const PastBooking = () => {

    const pastBooking = [
        {
            id: "1",
            name: "Sarah Miler",
            amount: "500",
            service: "Home Cleaning",
            img: image,
        },
        {
            id: "2",
            name: "Sarah Miler",
            amount: "500",
            service: "Home Cleaning",
            img: image,
        },
        {
            id: "3",
            name: "Sarah Miler",
            amount: "500",
            service: "Home Cleaning",
            img: image,
        },
        {
            id: "4",
            name: "Sarah Miler",
            amount: "500",
            service: "Home Cleaning",
            img: image,
        },
    ]

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
                    {pastBooking.map((items, index) => {
                        return (
                            <div data-aos="fade-up" key={index} className='past-booking-details'>
                                <img src={items.img} alt='Worker Image' />
                                <div className='booking-service'>
                                    <h3>{items.service}</h3>
                                    <p>Worker: {items.name}</p>
                                    <p>Amount Paid: &#8377; {items.amount}</p>
                                </div>
                                <div className='past-booking-rebooking'>
                                    <button onClick={() => { handleClick() }}>&#x21bb; Rebook</button>
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