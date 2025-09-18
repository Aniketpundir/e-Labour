import React from 'react'
import "./WorkerReview.css";
import image from "../../../../../assets/image.jpeg"
import image1 from "../../../../../assets/101.jpg"

const averageRatings = {
    averageRating: 4.8,
    totalReviews: 125,
}

const ratingData = [
    { stars: 5, percent: 70 },
    { stars: 4, percent: 20 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
];

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

averageRatings.totalReviews = customers_reviews.length;

const WorkerReview = () => {

    return (
        <div className="ratings-card">
            <h3 className="ratings-title">Ratings & Reviews</h3>

            <div className="ratings-summary">
                <div className="average-score">
                    <h1>{averageRatings.averageRating}</h1>
                    <p>Based on {averageRatings.totalReviews} reviews</p>
                </div>

                <div className="ratings-bars">
                    {ratingData.map((item) => {
                        const raw = Number(item.percent);
                        const percent = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0;

                        return (
                            <div key={item.stars} className="rating-row">
                                <span className="rating-label">{item.stars}</span>

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