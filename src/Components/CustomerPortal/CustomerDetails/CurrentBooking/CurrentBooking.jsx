import React, { useState } from "react";
import "./CurrentBooking.css";
import { FaPhone } from "react-icons/fa6";
import image from "../../../../assets/101.jpg"

const workers = [
    {
        id: 1,
        name: "Sarah Miller",
        role: "Master Plumber",
        service: "Plumbing Repair",
        date: "Oct 28, 2023, 2:00 PM",
        rating: 4.9,
        reviews: 120,
        location: "123 Maple Street, Anytown, USA",
        payment: "Visa **** 1234",
        experience: "5 Years of Experience",
        eta: "5 mins",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
    {
        id: 2,
        name: "David Lee",
        role: "Electrician",
        service: "Electrical Installation",
        date: "Oct 30, 2023, 10:00 AM",
        rating: 4.8,
        reviews: 85,
        location: "456 Oak Avenue, Anytown, USA",
        payment: "Mastercard **** 5678",
        experience: "3 Years of Experience",
        eta: "",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
    {
        id: 3,
        name: "David Lee",
        role: "Electrician",
        service: "Electrical Installation",
        date: "Oct 30, 2023, 10:00 AM",
        rating: 4.8,
        reviews: 85,
        location: "456 Oak Avenue, Anytown, USA",
        payment: "Mastercard **** 5678",
        experience: "3 Years of Experience",
        eta: "",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
    {
        id: 4,
        name: "David Lee",
        role: "Electrician",
        service: "Electrical Installation",
        date: "Oct 30, 2023, 10:00 AM",
        rating: 4.8,
        reviews: 85,
        location: "456 Oak Avenue, Anytown, USA",
        payment: "Mastercard **** 5678",
        experience: "3 Years of Experience",
        eta: "",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
    {
        id: 5,
        name: "David Lee",
        role: "Electrician",
        service: "Electrical Installation",
        date: "Oct 30, 2023, 10:00 AM",
        rating: 4.8,
        reviews: 85,
        location: "456 Oak Avenue, Anytown, USA",
        payment: "Mastercard **** 5678",
        experience: "3 Years of Experience",
        eta: "",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
    {
        id: 6,
        name: "David Lee",
        role: "Electrician",
        service: "Electrical Installation",
        date: "Oct 30, 2023, 10:00 AM",
        rating: 4.8,
        reviews: 85,
        location: "456 Oak Avenue, Anytown, USA",
        payment: "Mastercard **** 5678",
        experience: "3 Years of Experience",
        eta: "",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
    {
        id: 7,
        name: "David Lee",
        role: "Electrician",
        service: "Electrical Installation",
        date: "Oct 30, 2023, 10:00 AM",
        rating: 4.8,
        reviews: 85,
        location: "456 Oak Avenue, Anytown, USA",
        payment: "Mastercard **** 5678",
        experience: "3 Years of Experience",
        eta: "",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
    {
        id: 8,
        name: "David Lee",
        role: "Electrician",
        service: "Electrical Installation",
        date: "Oct 30, 2023, 10:00 AM",
        rating: 4.8,
        reviews: 85,
        location: "456 Oak Avenue, Anytown, USA",
        payment: "Mastercard **** 5678",
        experience: "3 Years of Experience",
        eta: "",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
    {
        id: 9,
        name: "Aniket",
        role: "Electrician",
        service: "Electrical Installation",
        date: "Oct 30, 2023, 10:00 AM",
        rating: 4.8,
        reviews: 85,
        location: "456 Oak Avenue, Anytown, USA",
        payment: "Mastercard **** 5678",
        experience: "3 Years of Experience",
        eta: "",
        img: image,
        number: "+911234567890",
        email: "12345@gmail.com",
        completeService: "0",
    },
];

const CurrentBooking = () => {
    const [selectedWorker, setSelectedWorker] = useState(workers[0]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth <= 650;


    const DetailsSection = ({ worker }) => (
        <div className="details-body mobile-details">
            <div>
                <p><strong>Booking ID</strong><br />#{worker.id}FS123456</p>
            </div>
            <div>
                <p><strong>Location</strong><br />{worker.location}</p>
            </div>
            <div>
                <p><strong>Date & Time</strong><br />{worker.date}</p>
            </div>
            <div>
                <p><strong>Payment Method</strong><br />{worker.payment}</p>
            </div>
            <div>
                <p><strong>Number</strong><br />{worker.number}</p>
            </div>
            <div>
                <p><strong>Email</strong><br />{worker.email}</p>
            </div>
            <div>
                <p><strong>Complete Service</strong><br />{worker.completeService}</p>
            </div>
            <button
                className="cancel-btn"
                onClick={() => alert("Booking canceled")}
            >
                Cancel Booking
            </button>
        </div>
    );

    return (
        <div data-aos="fade-down" className="container">
            {/* Left Panel */}
            <div data-aos="fade-down" className="left-panel">
                <h2>My Bookings</h2>
                <p className="subtitle">
                    View and manage your upcoming service bookings.
                </p>

                <h3>Upcoming Bookings</h3>
                {workers.map((worker) => (
                    <div key={worker.id}>
                        <div
                            className={`card ${selectedWorker.id === worker.id ? "active" : ""}`}
                            onClick={() => setSelectedWorker(worker)}
                        >
                            <div className="card-left">
                                <img src={worker.img} alt={worker.name} className="avatar" />
                                <div className="card-info">
                                    <strong>{worker.name}</strong>
                                    <p>{worker.service}</p>
                                    <div className="rating">
                                        {worker.rating} ({worker.reviews} reviews)
                                    </div>
                                    <small>Date: {worker.date}</small>
                                </div>
                            </div>
                        </div>

                        {/* Render details under clicked card on mobile */}
                        {isMobile && selectedWorker.id === worker.id && (
                            <>
                                <div data-aos="fade-down" className="profile-header mobile-profile">
                                    <img src={worker.img} alt={worker.name} className="profile-avatar" />
                                    <div>
                                        <h2>{worker.name}</h2>
                                        <p>{worker.role}</p>
                                        <p className="experience">{worker.experience}</p>
                                    </div>
                                    <button
                                        className="call-btn"
                                        onClick={() => (window.location.href = `tel:${worker.number}`)}
                                    >
                                        <FaPhone /> Call
                                    </button>
                                </div>
                                <DetailsSection worker={worker} />
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Right Panel for Desktop */}
            {!isMobile && (
                <div data-aos="fade-down" className="right-panel">
                    <div data-aos="fade-down" className="profile-header">
                        <img data-aos="fade-down"
                            src={selectedWorker.img}
                            alt={selectedWorker.name}
                            className="profile-avatar"
                        />
                        <div data-aos="fade-down">
                            <h2>{selectedWorker.name}</h2>
                            <p>{selectedWorker.role}</p>
                            <p className="experience">{selectedWorker.experience}</p>
                        </div>
                        <button data-aos="fade-down"
                            className="call-btn"
                            onClick={() => (window.location.href = `tel:${selectedWorker.number}`)}
                        >
                            <FaPhone /> Call
                        </button>
                    </div>
                    <DetailsSection worker={selectedWorker} />
                </div>
            )}
        </div>
    );
};

export default CurrentBooking;
