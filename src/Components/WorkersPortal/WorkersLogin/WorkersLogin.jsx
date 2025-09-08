import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./WorkersLogin.css"
import workersLoginImg from "../../../assets/workers_login_img.png"


const WorkersLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
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

    console.log(data)
    return (
        <>
            <div className='WorkerLogin'>
                <div className='WorkerLogin-content'>
                    <div className='WorkerLogin-text-form'>
                        <h1>Worker Login</h1>
                        <h5>Welcome back! Please login to your account</h5>
                        <form>
                            <input placeholder='Enter your email' type='email' name='email' value={data.email} onChange={handleChange} required />
                            <div className='input-field-for-login'>
                                <input placeholder='Confirm Password' type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleChange} />
                                <p
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='hide_show'
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </p>
                            </div>
                            <button className='login-button'>Login as Customer</button>
                            <p>
                                Don't have an account? <span onClick={() => {
                                    Navigate("/customer-signup")
                                }}>Sign up here</span>
                            </p>
                        </form>
                    </div>
                    <div className='CustomerLogin-img'>
                        <img src={workersLoginImg} alt='Customer Login Img' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkersLogin