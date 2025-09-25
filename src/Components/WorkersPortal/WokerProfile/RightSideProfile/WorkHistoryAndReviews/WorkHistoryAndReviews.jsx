import React from 'react';
import './WorkHistoryAndReviews.css';


const WorkHistoryAndReviews = () => {
    const reviews = [
        {
            title: 'Leaky Faucet Repair',
            date: 'Jan 15, 2024',
            rating: 4.0,
            comment: 'John was professional, efficient, and did a great job fixing my sink. Highly recommended.',
        },
        {
            title: 'Light Fixture Installation',
            date: 'Dec 20, 2023',
            rating: 5.0,
            comment: 'Excellent service! John installed our new chandelier perfectly. He was very careful and cleaned up afterwards.',
        },
        {
            title: 'Light Fixture Installation',
            date: 'Dec 20, 2023',
            rating: 5.0,
            comment: 'Excellent service! John installed our new chandelier perfectly. He was very careful and cleaned up afterwards.',
        },
        {
            title: 'Light Fixture Installation',
            date: 'Dec 20, 2023',
            rating: 5.0,
            comment: 'Excellent service! John installed our new chandelier perfectly. He was very careful and cleaned up afterwards.',
        },
        {
            title: 'Light Fixture Installation',
            date: 'Dec 20, 2023',
            rating: 5.0,
            comment: 'Excellent service! John installed our new chandelier perfectly. He was very careful and cleaned up afterwards.',
        },
        {
            title: 'Light Fixture Installation',
            date: 'Dec 20, 2023',
            rating: 5.0,
            comment: 'Excellent service! John installed our new chandelier perfectly. He was very careful and cleaned up afterwards.',
        },
    ];

    return (
        <div className="work-history-card info-card">
            <h2>Work History & Reviews</h2>
            <div className='reviews-List'>
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <div className="review-header">
                            <h3 className="review-title">{review.title}</h3>
                            <p>{review.rating}/5</p>
                        </div>
                        <p className="review-meta">Completed on {review.date}</p>
                        <p className="review-comment">"{review.comment}"</p>
                        <hr />
                    </div>

                ))}
            </div>
        </div>
    );
};

export default WorkHistoryAndReviews;