import React, { useContext, useState, useEffect } from "react";
import "./CurrentBooking.css";
import { FaPhone } from "react-icons/fa6";
import { StoreContext } from "../../../../Context/StoreContext";
import axios from "axios";

const CurrentBooking = () => {
    const { URL_LINK, bookingWorkerList, customerToken } = useContext(StoreContext);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showCancelForm, setShowCancelForm] = useState(false);
    const [reason, setReason] = useState("");
    const [otherReason, setOtherReason] = useState("");
    const [showRatingForWorker, setShowRatingForWorker] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    const workers = bookingWorkerList || [];
    const isMobile = windowWidth <= 650;

    // Set selectedWorker when bookings arrive
    useEffect(() => {
        if (workers.length > 0) setSelectedWorker(workers[0]);
    }, [workers]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!workers || workers.length === 0) {
        return <p className="no-bookings">No bookings available.</p>;
    }

    // Cancel booking
    const handleBookingCancel = async (id) => {
        const cancelReason = reason === "Other" ? otherReason : reason;
        if (!cancelReason) return alert("Please select or enter a reason!");

        try {
            await axios.patch(
                `${URL_LINK}api/bookings/${id}/cancel`,
                { reason: cancelReason },
                { headers: { token: customerToken } }
            );
            alert("Booking cancelled successfully!");
            setShowCancelForm(false);
            setReason("");
            setOtherReason("");
        } catch (error) {
            console.error(error);
            alert("Error cancelling booking.");
        }
    };

    // Submit rating
    const handleRatingSubmit = async (workerId, bookingId) => {
        if (rating === 0) return alert("Please select a rating!");

        try {
            await axios.post(
                `${URL_LINK}api/reviews/${bookingId}`,
                { bookingId: workerId, rating, review: feedback },
                { headers: { token: customerToken } }
            );
            alert("Thanks for your feedback!");
            setShowRatingForWorker(false);
            setRating(0);
            setFeedback("");
        } catch (error) {
            console.error(error);
            alert("Error submitting rating.");
        }
    };

    // Cancel form component
    const CancelForm = ({ onConfirm, onCancel }) => (
        <div className="cancel-section">
            <p><strong>Why are you cancelling?</strong></p>
            {["Changed my mind", "Found another worker", "Too expensive", "Other"].map(item => (
                <label key={item}>
                    <input
                        type="radio"
                        name="cancel-reason"
                        value={item}
                        checked={reason === item}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    {item}
                </label>
            ))}
            {reason === "Other" && (
                <textarea
                    placeholder="Please specify..."
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                />
            )}
            <div className="cancel-actions">
                <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
                <button className="cancel-btn" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );

    // Rating form component
    const RatingForm = ({ workerId, bookingId }) => (
        <div className="rating-section">
            <p><strong>Rate your experience</strong></p>
            <div className="rating-circles">
                {[1, 2, 3, 4, 5].map(num => (
                    <div
                        key={num}
                        className={`circle ${rating === num ? "selected" : ""}`}
                        onClick={() => setRating(num)}
                    >
                        {num}
                    </div>
                ))}
            </div>
            <textarea
                placeholder="Write your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />
            <button className="submit-btn" onClick={() => handleRatingSubmit(workerId, bookingId)}>Submit</button>
        </div>
    );

    // Render booking card details (used for both mobile and desktop)
    const BookingDetails = ({ worker }) => (
        <div className="details-body">
            <p><strong>Booking Code</strong>: {worker.bookingCode}</p>
            <p><strong>Location</strong>: {worker.location.street}, {worker.location.city}</p>
            <p><strong>Date & Time</strong>: {new Date(worker.scheduledDate).toLocaleString()}</p>
            <p><strong>Amount</strong>: {worker.payment.amount}/Day</p>
            <p><strong>Payment</strong>: ({worker.payment.method}, {worker.payment.status})</p>
            <p><strong>Status</strong>: {worker.status}</p>

            <div className="button-container">
                {showRatingForWorker ? (
                    <RatingForm workerId={worker._id} bookingId={worker.workerId._id} />
                ) : (
                    <button className="cancel-btn1" onClick={() => setShowRatingForWorker(true)}>Work Complete</button>
                )}

                {showCancelForm ? (
                    <CancelForm
                        onConfirm={() => handleBookingCancel(worker._id)}
                        onCancel={() => setShowCancelForm(false)}
                    />
                ) : (
                    <button className="cancel-btn" onClick={() => setShowCancelForm(true)}>Cancel Booking</button>
                )}
            </div>
        </div>
    );

    return (
        <div className="container">
            {/* LEFT PANEL */}
            <div className="left-panel">
                <h2>My Bookings</h2>
                <p className="subtitle">View and manage your upcoming service bookings.</p>
                <h3>Upcoming Bookings</h3>

                {workers.map(worker => (
                    <div key={worker._id}>
                        <div
                            className={`card ${selectedWorker?._id === worker._id ? "active" : ""}`}
                            onClick={() => setSelectedWorker(worker)}
                        >
                            <div className="card-left">
                                <img src={worker.workerId?.avatar?.image} alt={worker.workerId?.name} className="avatar" />
                                <div className="card-info">
                                    <strong>{worker.workerId?.name}</strong>
                                    <p>{worker.serviceType}</p>
                                    <small>Scheduled: {new Date(worker.scheduledDate).toLocaleString()}</small>
                                </div>
                            </div>
                        </div>

                        {/* MOBILE DETAILS */}
                        {isMobile && selectedWorker?._id === worker._id && (
                            <div className="mobile-details">
                                <BookingDetails worker={worker} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* RIGHT PANEL (Desktop) */}
            {!isMobile && selectedWorker && (
                <div className="right-panel">
                    <div className="profile-header">
                        <img src={selectedWorker.workerId?.avatar?.image} alt={selectedWorker.workerId?.name} className="profile-avatar" />
                        <div>
                            <h2>{selectedWorker.workerId?.name}</h2>
                            <p>{selectedWorker.serviceType}</p>
                            <p className="experience">Phone: {selectedWorker.workerId?.phone}</p>
                        </div>
                        <button className="call-btn" onClick={() => (window.location.href = `tel:${selectedWorker.workerId?.phone}`)}>
                            <FaPhone /> Call
                        </button>
                    </div>

                    <BookingDetails worker={selectedWorker} />
                </div>
            )}
        </div>
    );
};

export default CurrentBooking;
