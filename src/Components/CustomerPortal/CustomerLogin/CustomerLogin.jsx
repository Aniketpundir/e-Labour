import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CustomerLogin.css";
import Cookies from "js-cookie";
import customerLoginImg from "../../../assets/customer_login_img.png";
import { StoreContext } from '../../../Context/StoreContext';
import axios from 'axios';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const CustomerLogin = () => {
    // const role = "customer";
    const Navigate = useNavigate();
    const { URL_LINK } = useContext(StoreContext);

    // ✅ Correct key and fallback

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        role: "customer",
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();


        let newURL = URL_LINK;
        newURL += "api/users/login";

        try {
            const res = await axios.post(newURL, data);
            const customerToken = res.data.token;
            if (res.data.success) {
                alert(res.data.message);
            } else {
                console.log(res.data.message)
            }
            Cookies.set("customerToken", customerToken,/*{ expires: 7, path: "/"}*/);
            Navigate("/");
        } catch (error) {
            alert(error.message);
        }
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
                                {showPassword ? <BiShow /> : <BiHide />}
                            </p>
                        </div>

                        <button type="submit" className='login-button'>
                            Login as Customer
                        </button>
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
