import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkersLogin.css";
import { StoreContext } from "../../../Context/StoreContext.jsx";
import workersLoginImg from "../../../assets/workers_login_img.png";
import axios from "axios";
import Cookies from "js-cookie";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const WorkersLogin = () => {
    const { URL_LINK } = useContext(StoreContext);
    const [data, setData] = useState({ email: "", password: "", role: "worker" });
    const Navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        let newUrl = URL_LINK;
        newUrl += "api/users/login";

        try {
            const res = await axios.post(newUrl, data);
            // cccc@gmail.com
            const workerToken = res.data.token;
            if (res.data.success) {
                alert(res.data.message);
                Navigate("/worker-profile");
            } else {
                alert(res.data.message);
            }
            Cookies.set("WorkerToken", workerToken, /*{ expires: 7, path: "/"}*/)
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="WorkerLogin">
            <div className="WorkerLogin-content">
                <div className="WorkerLogin-text-form">
                    <h1>Worker Login</h1>
                    <h5>Welcome back! Please login to your account</h5>
                    <form onSubmit={handleLogin}>
                        <input placeholder="Enter your email" type="email" name="email" value={data.email} onChange={handleChange} required />

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

                        <button className="login-button">Login as Worker
                        </button>
                        <p>
                            Don't have an account? <span onClick={() => Navigate("/workers-signup")}>Sign up here</span>
                        </p>
                    </form>
                </div>
                <div className="WorkerLogin-img">
                    <img src={workersLoginImg} alt="Worker Login Img" />
                </div>
            </div>
        </div>
    );
};

export default WorkersLogin;
