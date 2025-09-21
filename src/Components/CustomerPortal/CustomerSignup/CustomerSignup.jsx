import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./CustomerSignup.css"
import OTPButton from '../../OtpButton/OtpButton'
import { form } from 'framer-motion/client'

const CustomerSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [data, setData] = useState({
        fullName: "",
        emailId: "",
        opt: "",
        mobileNumber: "",
        password: ""
    })
    const [file, setFile] = useState(null);

    const Navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleClick = (() => {
        setCheckbox((prev) => !prev);
    })

    const handleFileChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]); // store selected file
    };

    const formData = new FormData();
    formData.append("fullName:", data.fullName);
    formData.append("emailId", data.emailId);
    formData.append("opt", data.opt);
    formData.append("password", data.password)
    formData.append("checkbox", checkbox);
    if (file) {
        formData.append("profileImage", file);
    }

    // for (let [key, value] of formData.entries()) {
    //     console.log(key, value);
    // }

    return (
        <>
            <div data-aos="fade-right" className='CustomerSignup'>
                <div data-aos="fade-right" className='CustomerSignup-form'>
                    <h2>Create your customer account</h2>
                    <p>Already have an account? <span onClick={() => {
                        Navigate("/customer-login")
                    }}>Sign in</span></p>
                    {/* onSubmit={onLogin} */}
                    <form data-aos="fade-right">
                        <div data-aos="fade-right" className='profile-image'>
                            <label>
                                Select your profile image.
                            </label>
                            <input placeholder='Full Name' onChange={handleFileChange} type='file' required />
                        </div>

                        <input placeholder='Full Name' type='text' name='fullName' value={data.fullName} onChange={handleChange} required />

                        <input placeholder='Email address' type='email' name='emailId' value={data.emailId} onChange={handleChange}
                            required />

                        <div data-aos="fade-right" className="otp-section">
                            <input placeholder="Enter One Time Password(OTP)" type="text" name='opt' value={data.opt} onChange={handleChange} required />
                            <OTPButton />
                        </div>

                        <input placeholder='Mobile Number' type='text' name='mobileNumber' value={data.mobileNumber}
                            onChange={handleChange} required />
                        <div className='input-field1'>
                            <input placeholder='Confirm Password' type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleChange} />
                            <p
                                onClick={() => setShowPassword(!showPassword)}
                                className='hide-show'
                            >

                                {showPassword ? "Hide.." : "Show"}
                            </p>
                        </div>
                        <h5>
                            <input type='checkbox' onClick={handleClick} /> I agree to the <span>Terms & Conditions</span>
                        </h5>
                        <button type='submit' className='submit-button'>Create Customer Account</button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default CustomerSignup