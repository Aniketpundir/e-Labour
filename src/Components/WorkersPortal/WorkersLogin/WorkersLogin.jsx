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
            <div data-aos="fade-right" className='WorkerLogin'>
                <div data-aos="fade-right" className='WorkerLogin-content'>
                    <div data-aos="fade-right" className='WorkerLogin-text-form'>
                        <h1 data-aos="fade-right">Worker Login</h1>
                        <h5 data-aos="fade-right">Welcome back! Please login to your account</h5>
                        <form data-aos="fade-right">
                            <input placeholder='Enter your email' type='email' name='email' value={data.email} onChange={handleChange} required />
                            <input placeholder='Password' type="password" name='password' value={data.password} onChange={handleChange} />
                            <button className='login-button'>Login as Customer</button>
                            <p data-aos="fade-right">
                                Don't have an account? <span onClick={() => {
                                    Navigate("/workers-signup")
                                }}>Sign up here</span>
                            </p>
                        </form>
                    </div>
                    <div data-aos="fade-right" className='WorkerLogin-img'>
                        <img data-aos="fade-right" src={workersLoginImg} alt='Worker Login Img' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkersLogin