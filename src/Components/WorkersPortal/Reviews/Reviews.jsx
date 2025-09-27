import React from "react";
import "./Reviews.css";

const RatingsReviews = () => {
    // Ratings data (raw counts, not percentages)
    const ratingData = {
        average: 4.7,
        totalReviews: 125,
        breakdown: {
            5: 62,
            4: 38,
            3: 12,
            2: 7,
            1: 6,
        },
    };

    // Function to calculate percentage
    const calculatePercent = (count) => {
        return ((count / ratingData.totalReviews) * 100).toFixed(1);
    };

    // Example reviews
    const reviews = [
        {
            id: 1,
            name: "Sophia Carter",
            time: "2 months ago",
            rating: 5,
            review:
                "Excellent work! Sophia was very professional and delivered the project ahead of schedule. Highly recommend!",
        },
        {
            id: 2,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
        {
            id: 3,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
        {
            id: 4,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
        {
            id: 5,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
        {
            id: 6,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
        {
            id: 7,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
        {
            id: 8,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
        {
            id: 9,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
        {
            id: 10,
            name: "Liam Bennett",
            time: "3 months ago",
            rating: 4,
            review:
                "Good work overall. Communication could be a little better, but the quality was solid.",
        },
    ];

    return (
        <div className="ratings-container">
            <h2>Ratings & Reviews</h2>

            {/* Rating Summary */}
            <div className="rating-summary">
                {/* Average Rating Box */}
                <div className="rating-box">
                    <h1>{ratingData.average}</h1>
                    <p>Based on {ratingData.totalReviews} reviews</p>
                </div>

                {/* Breakdown */}
                <div className="rating-breakdown">
                    {Object.entries(ratingData.breakdown).map(([stars, count]) => {
                        const percent = calculatePercent(count);
                        return (
                            <div className="bar" key={stars}>
                                <span>{stars}</span>
                                <div className="bar-track">
                                    <div
                                        className="bar-fill"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                                <span>{percent}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Reviews */}
            <div className="reviews-section">
                <h3>All Reviews</h3>
                {reviews.map((r) => (
                    <div className="review-card" key={r.id}>
                        <h4>{r.name}</h4>
                        <small>{r.time}</small>
                        <p className="review-rating">{r.rating}/5</p>
                        <p>{r.review}</p>
                        <div className="review-actions">
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingsReviews;
