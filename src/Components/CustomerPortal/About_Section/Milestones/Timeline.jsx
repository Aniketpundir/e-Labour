// Timeline.js

import React from 'react';
import './Timeline.css';

const milestonesData = [
  {
    year: '2021',
    label: 'THE IDEA',
    title: 'Conception of the Platform',
    description: 'The journey began with a simple idea: to create a trustworthy and efficient platform connecting customers with skilled labour.',
  },
  {
    year: '2022',
    label: 'PLATFORM LAUNCH',
    title: 'E - Labour Goes Live!',
    description: 'After months of development and testing, we officially launched, bringing our vision to the public and onboarding our first 100 workers.',
  },
  {
    year: '2023',
    label: '10K USERS REACHED',
    title: 'Community Growth',
    description: 'A major milestone! Our community grew to over 10,000 active users, a testament to the trust and value we provide.',
  },
  {
    year: '2024',
    label: 'EXPANSION',
    title: 'New Service Categories',
    description: 'We expanded our service offerings, introducing new categories to meet the growing demands of our diverse user base.',
  },
];

const Timeline = () => {
  return (
    <div data-aos="fade-down" className="timeline-container">
      <h2>Our Milestones</h2>
      <ul className="timeline">
        {milestonesData.map((milestone, index) => (
          <li key={index} className={`milestone-item ${index % 2 === 0 ? 'milestone-item-left' : 'milestone-item-right'}`}>
            <div className="timeline-dot"></div>
            <div data-aos="fade-right" className="milestone-content">
              <div className="milestone-header">
                <span className="milestone-year">{milestone.year} - {milestone.label}</span>
              </div>
              <h3 className="milestone-title">{milestone.title}</h3>
              <p className="milestone-description">{milestone.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;