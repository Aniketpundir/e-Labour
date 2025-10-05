import React, { useContext, useState, useEffect } from "react";
import "./CurrentBooking.css";
import { FaPhone } from "react-icons/fa6";
import { StoreContext } from "../../../../Context/StoreContext";
import axios from "axios";

const CurrentBooking = () => {
    const { URL_LINK, bookingWorkerList, customerToken } = useContext(StoreContext);
    const workers = bookingWorkerList || [];
    const [selectedWorker, setSelectedWorker] = useState(workers[0] || null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [cancelWorkerId, setCancelWorkerId] = useState(null);
    const [reason, setReason] = useState("");
    const [otherReason, setOtherReason] = useState("");
    const [showRatingForWorker, setShowRatingForWorker] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        if (workers.length > 0 && !selectedWorker) {
            setSelectedWorker(workers[0]);
        }
    }, [workers]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth <= 650;

    if (!workers || workers.length === 0) {
        return <p className="no-bookings">No bookings available.</p>;
    }

    // Cancel booking
    const handleBookingCancel = async (id) => {
        const cancelReason = reason === "Other" ? otherReason : reason;
        if (!cancelReason) {
            alert("Please select or enter a reason!");
            return;
        }

        try {
            await axios.patch(
                `${URL_LINK}api/bookings/${id}/cancel`,
                { reason: cancelReason },
                { headers: { token: customerToken } }
            );
            alert("Booking cancelled successfully!");
            setCancelWorkerId(null);
            setReason("");
            setOtherReason("");
        } catch (error) {
            console.error(error);
            alert("Error cancelling booking.");
        }
    };

    // Rating submit
    const handleRatingSubmit = async (id) => {
        if (rating === 0) {
            alert("Please select a rating!");
            return;
        }

        try {
            await axios.post(
                `${URL_LINK}api/bookings/${id}/rate`,
                { bookingId: id, rating, feedback },  // ✅ sending bookingId also
                { headers: { token: customerToken } }
            );
            alert("Thanks for your feedback!");
            setShowRatingForWorker(null);
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
    const RatingForm = ({ workerId }) => (
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
            <button className="submit-btn" onClick={() => handleRatingSubmit(workerId)}>Submit</button>
        </div>
    );

    return (
        <div className="container">
            {/* LEFT PANEL */}
            <div className="left-panel">
                <h2>My Bookings</h2>
                <p className="subtitle">View and manage your upcoming service bookings.</p>

                <h3>Upcoming Bookings</h3>
                {workers.map((worker, index) => (
                    <div key={index}>
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

                        {/* MOBILE VIEW DETAILS */}
                        {isMobile && selectedWorker?._id === worker._id && (
                            <>
                                <div className="profile-header mobile-profile">
                                    <div>
                                        <p>{worker.serviceType}</p>
                                        <p className="experience">Phone: {worker.workerId?.phone}</p>
                                    </div>
                                    <button className="call-btn" onClick={() => (window.location.href = `tel:${worker.workerId?.phone}`)}>
                                        <FaPhone /> Call
                                    </button>
                                </div>

                                <div className="details-body mobile-details">
                                    <p><strong>Booking Code</strong>: {worker.bookingCode}</p>
                                    <p><strong>Location</strong>: {worker.location.street}, {worker.location.city}, {worker.location.state} - {worker.location.zipCode}</p>
                                    <p><strong>Date & Time</strong>: {new Date(worker.scheduledDate).toLocaleString()}</p>
                                    <p><strong>Amount</strong>: {worker.payment.amount}/Day</p>
                                    <p><strong>Payment</strong>: ({worker.payment.method}, {worker.payment.status})</p>
                                    <p><strong>Worker Email</strong>: {worker.workerId?.email}</p>
                                    <p><strong>Status</strong>: {worker.status}</p>

                                    <div className="button-container">
                                        {showRatingForWorker === worker._id ? (
                                            <RatingForm workerId={worker._id} />
                                        ) : (
                                            <button className="cancel-btn1" onClick={() => setShowRatingForWorker(worker._id)}>Work Complete</button>
                                        )}

                                        {cancelWorkerId === worker._id && (
                                            <CancelForm
                                                onConfirm={() => handleBookingCancel(worker._id)}
                                                onCancel={() => setCancelWorkerId(null)}
                                            />
                                        )}
                                        {cancelWorkerId !== worker._id && (
                                            <button className="cancel-btn" onClick={() => setCancelWorkerId(worker._id)}>Cancel Booking</button>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* RIGHT PANEL (Desktop only) */}
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

                    <div className="details-body">
                        <p><strong>Booking Code</strong>: {selectedWorker.bookingCode}</p>
                        <p><strong>Location</strong>: {selectedWorker.location.street}, {selectedWorker.location.city}, {selectedWorker.location.state} - {selectedWorker.location.zipCode}</p>
                        <p><strong>Booking Date</strong>: {new Date(selectedWorker.bookingDate).toLocaleString()}</p>
                        <p><strong>Scheduled Date</strong>: {new Date(selectedWorker.scheduledDate).toLocaleString()}</p>
                        <p><strong>Amount</strong>: {selectedWorker.payment.amount}/Day</p>
                        <p><strong>Payment</strong>: ({selectedWorker.payment.method}, {selectedWorker.payment.status})</p>
                        <p><strong>Worker Email</strong>: {selectedWorker.workerId?.email}</p>
                        <p><strong>Status</strong>: {selectedWorker.status}</p>

                        <div className="button-container">
                            {showRatingForWorker === selectedWorker._id ? (
                                <RatingForm workerId={selectedWorker._id} />
                            ) : (
                                <button className="cancel-btn1" onClick={() => setShowRatingForWorker(selectedWorker._id)}>Work Complete</button>
                            )}

                            {cancelWorkerId === selectedWorker._id && (
                                <CancelForm
                                    onConfirm={() => handleBookingCancel(selectedWorker._id)}
                                    onCancel={() => setCancelWorkerId(null)}
                                />
                            )}
                            {cancelWorkerId !== selectedWorker._id && (
                                <button className="cancel-btn" onClick={() => setCancelWorkerId(selectedWorker._id)}>Cancel Booking</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentBooking;
