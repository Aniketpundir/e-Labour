import React, { useContext } from 'react'
import "./CustomerProfile.css";
import image from "../../../../assets/101.jpg";
import { address } from 'framer-motion/client';
import { StoreContext } from '../../../../Context/StoreContext';

const CustomerProfile = () => {

    const { customerProfileData } = useContext(StoreContext);

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

    console.log(customerProfileData.customer)

    return (
        <>
            <div data-aos="fade-down" className='customer-profile'>
                <div data-aos="fade-down" className='customer-profile-container'>
                    <h1>Your Profile</h1>
                    <div data-aos="fade-down" className='customer-profile-content'>
                        <div data-aos="fade-down" className='customer-image-section'>
                            <div data-aos="fade-down" className='customer-image-name'>
                                <img src={customerProfileData.customer &&
                                    customerProfileData.customer.avatar &&
                                    customerProfileData.customer.avatar.image} alt='Customer Profile' />
                                <h3>{customerProfileData.customer.name}</h3>
                                <p>{customerProfileData.customer.email
                                }</p>
                                <p>{customerProfileData.customer.phone}</p>
                            </div>
                        </div>
                        <div data-aos="fade-down" className='customer-profile-address'>
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