import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./WorkersSignup.css"
import OTPButton from '../../OtpButton/OtpButton'

const WorkersSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        fullName: "",
        emailId: "",
        opt: "",
        mobileNumber: "",
        password: ""
    })

    const Navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    console.log(data);
    return (
        <>
            <div className='WorkersSignup'>
                <div className='WorkersSignup-form'>
                    <h2>Create your worker account</h2>
                    <p>Already have an account? <span onClick={() => {
                        Navigate("/workers-login")
                    }}>Sign in</span></p>
                    {/* onSubmit={onLogin} */}
                    <form>
                        <input placeholder='Full Name' type='text' name='fullName' value={data.fullName} onChange={handleChange} required />

                        <input placeholder='Email address' type='email' name='emailId' value={data.emailId} onChange={handleChange}
                            required />

                        <div className="otp-section">
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

                                {showPassword ? "Hide" : "Show"}
                            </p>
                        </div>
                        <h5>
                            <input type='checkbox' /> I agree to the <span>Terms & Conditions</span>
                        </h5>
                        <button type='submit' className='submit-button'>Create Customer Account</button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default WorkersSignup