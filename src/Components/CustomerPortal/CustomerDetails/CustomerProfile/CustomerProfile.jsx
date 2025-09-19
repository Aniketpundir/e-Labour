import React from 'react'
import "./CustomerProfile.css";
import image from "../../../../assets/101.jpg";
import { address } from 'framer-motion/client';

const CustomerProfile = () => {

    const customerDetails = [
        {
            id: "1",
            name: "Sophia Carter",
            email: "sophia.carter@gmail.com",
            number: "(555) 123-4567",
            img: image,
            address: [
                {
                    id: "1",
                    street: "45 Rajpur Road",
                    city: "Dehradun",
                    state: "Uttarakhand",
                    zip_code: "248002",
                },
                {
                    id: "2",
                    street: "45 Rajpur Road",
                    city: "Dehradun",
                    state: "Uttarakhand",
                    zip_code: "248002",
                },
                {
                    id: "3",
                    street: "45 Rajpur Road",
                    city: "Dehradun",
                    state: "Uttarakhand",
                    zip_code: "248002",
                },
            ]
        }
    ]

    return (
        <>
            <div className='customer-profile'>
                <div className='customer-profile-container'>
                    <h1>Your Profile</h1>
                    <div className='customer-profile-content'>
                        <div className='customer-image-section'>
                            {customerDetails.map((items, index) => {
                                return (
                                    <div key={index} className='customer-image-name'>
                                        <img src={items.img} alt='Customer Profile' />
                                        <h3>{items.name}</h3>
                                        <p>{items.email}</p>
                                        <p>{items.number}</p>
                                    </div>
                                )
                            })}

                        </div>
                        <div className='customer-profile-address'>
                            <h3>Your Addresses</h3>
                            Your address will be saved when you book a worker. (जब आप किसी कर्मचारी को बुक करेंगे तो आपका पता शामिल कर लिया जाएगा।)<p></p>
                            {customerDetails.map((customer) => (
                                <div key={customer.id}>
                                    {customer.address.map((addr) => (
                                        <div key={addr.id} className='address-section'>
                                            <p><b>{addr.street}</b></p>
                                            <p>{addr.city}, {addr.state} - {addr.zip_code}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerProfile