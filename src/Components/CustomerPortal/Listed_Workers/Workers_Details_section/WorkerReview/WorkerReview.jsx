import React from 'react'
import "./WorkerReview.css";
import image from "../../../../../assets/image.jpeg"
import image1 from "../../../../../assets/101.jpg"

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
    if (!ratingData.totalReviews) return 0;
    return ((count / ratingData.totalReviews) * 100).toFixed(1);
};

const customers_reviews = [
    {
        id: 1,
        name: "Sophia Bennett",
        avatar: image,
        timeAgo: "1 month ago",
        comment:
            "Ethan did an excellent job fixing a leaky pipe in my bathroom. He was professional, efficient, and the price was reasonable. Highly recommend!",
    },
    {
        id: 2,
        name: "Liam Harper",
        avatar: image1,
        timeAgo: "2 months ago",
        comment:
            "Ethan was punctual and knowledgeable. He quickly identified the issue with my kitchen sink and fixed it. However, the cleanup could have been better.",
    },
    {
        id: 3,
        name: "Liam Harper",
        avatar: image1,
        timeAgo: "2 months ago",
        comment:
            "Ethan was punctual and knowledgeable. He quickly identified the issue with my kitchen sink and fixed it. However, the cleanup could have been better.",
    },
    {
        id: 4,
        name: "Liam Harper",
        avatar: image1,
        timeAgo: "2 months ago",
        comment:
            "Ethan was punctual and knowledgeable. He quickly identified the issue with my kitchen sink and fixed it. However, the cleanup could have been better.",
    },
    {
        id: 5,
        name: "Liam Harper",
        avatar: image1,
        timeAgo: "2 months ago",
        comment:
            "Ethan was punctual and knowledgeable. He quickly identified the issue with my kitchen sink and fixed it. However, the cleanup could have been better.",
    },
]

const WorkerReview = () => {

    return (
        <div data-aos="fade-up" className="ratings-card">
            <h3 data-aos="fade-up" className="ratings-title">Ratings & Reviews</h3>

            <div data-aos="fade-up" className="ratings-summary">
                <div data-aos="fade-up" className="average-score">
                    <h1 data-aos="fade-up">{ratingData.average}</h1>
                    <p data-aos="fade-up">Based on {ratingData.totalReviews} reviews</p>
                </div>

                <div data-aos="fade-up" className="ratings-bars">
                    {Object.entries(ratingData.breakdown).map(([stars, count]) => {
                        const percent = calculatePercent(count);

                        return (
                            <div data-aos="fade-up" key={stars} className="rating-row">
                                <span className="rating-label">{stars}</span>

                                <div className="bar-container" aria-hidden="true">
                                    <div
                                        className="bar-fill"
                                        style={{ width: `${percent}%` }}
                                        role="progressbar"
                                        aria-valuenow={percent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    />
                                </div>

                                <span className="rating-percent">{percent}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="reviews-container">
                {customers_reviews.map((r) => (
                    <div key={r.id} className="review">
                        <div className="review-header">
                            <img src={r.avatar} alt={r.name} className="review-avatar" />
                            <div>
                                <h4>{r.name}</h4>
                                <p className="review-time">{r.timeAgo}</p>
                            </div>
                        </div>
                        <p className="review-text">{r.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkerReview