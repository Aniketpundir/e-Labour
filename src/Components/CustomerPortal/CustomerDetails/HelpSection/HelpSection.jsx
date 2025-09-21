import React, { useState } from 'react';
import "./HelpSection.css";
import { FaQuestionCircle, FaExclamationCircle, FaComments, FaSyncAlt } from "react-icons/fa";

const HelpSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I book a service?",
            answer: "To book a service, browse available options, select your desired service, and follow the booking steps."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept credit/debit cards, UPI, net banking, and wallets for convenient payments."
        },
        {
            question: "How can I reschedule or cancel a booking?",
            answer: "Go to your bookings page, select the booking, and click reschedule or cancel as per your need."
        },
    ];

    return (
        <div data-aos="fade-down" className="support-help">
            <h1 data-aos="fade-down">Support & Help</h1>
            <p data-aos="fade-down">Find answers to common questions or get in touch with our support team.</p>

            {/* FAQ Section */}
            <div data-aos="fade-down" className="faq-section">
                <div data-aos="fade-down" className="faq-header">
                    <FaQuestionCircle className="faq-icon" /> Frequently Asked Questions
                </div>
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <div
                            className="faq-question"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className={`arrow ${openIndex === index ? "open" : ""}`}>▾</span>
                        </div>
                        {openIndex === index && (
                            <div className="faq-answer">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Complaint and Chat */}
            <div data-aos="fade-down" className="support-actions">
                <div data-aos="fade-down" className="card">
                    <FaExclamationCircle className="card-icon red" />
                    <h3>Raise a Complaint / Dispute</h3>
                    <p>If you have an issue with a service or booking, please submit a complaint form.</p>
                    <button>Submit Form</button>
                </div>
                <div data-aos="fade-down" className="card">
                    <FaComments className="card-icon green" />
                    <h3>Live Chat or Support Ticket</h3>
                    <p>Connect with our support team in real-time or submit a ticket for assistance.</p>
                    <button>Contact Support →</button>
                </div>
            </div>

            {/* Track Support */}
            <div data-aos="fade-down" className="track-support">
                <FaSyncAlt data-aos="fade-down" className="track-icon" />
                <h3>Track Support Request Status</h3>
                <label>Request ID</label>
                <div className="track-input">
                    <input type="text" placeholder="Enter your request ID" />
                    <button>Track</button>
                </div>
            </div>
        </div>
    );
};

export default HelpSection;
