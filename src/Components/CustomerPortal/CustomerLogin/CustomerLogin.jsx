import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slices/CustomerAuthSlice.js';
import "./CustomerLogin.css";
import customerLoginImg from "../../../assets/customer_login_img.png";

const CustomerLogin = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    // ✅ Correct key and fallback
    const { loading, error, user } = useSelector((state) => state.UserAuth || {});

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(data))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    alert("Login Successful!");
                    Navigate("/");
                } else {
                    alert("Login Failed: " + res.payload);
                }
                console.log(res);
            });
    };

    return (
        <div data-aos="fade-right" className='CustomerLogin'>
            <div data-aos="fade-right" className='CustomerLogin-content'>
                <div data-aos="fade-right" className='CustomerLogin-text-form'>
                    <h1>Customer Login</h1>
                    <h5>Welcome back! Please login to your account</h5>
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder='Enter your email'
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="input-field1">
                            <input
                                placeholder='Enter Password'
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                required
                            />
                            <p
                                onClick={() => setShowPassword(!showPassword)}
                                className="hide-show"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </p>
                        </div>

                        <button type="submit" className='login-button' disabled={loading}>
                            {loading ? "Logging in..." : "Login as Customer"}
                        </button>

                        {error && <p className="error-msg">{error}</p>}

                        <p>
                            Don't have an account?{" "}
                            <span onClick={() => Navigate("/customer-signup")}>
                                Sign up here
                            </span>
                        </p>
                    </form>
                </div>
                <div className='CustomerLogin-img'>
                    <img src={customerLoginImg} alt='Customer Login Img' />
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
