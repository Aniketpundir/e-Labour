// WorkersLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkersLogin.css";
import workersLoginImg from "../../../assets/workers_login_img.png";

const WorkersLogin = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.workersAuth);
    const Navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className="WorkerLogin">
            <div className="WorkerLogin-content">
                <div className="WorkerLogin-text-form">
                    <h1>Worker Login</h1>
                    <h5>Welcome back! Please login to your account</h5>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <input placeholder="Enter your email" type="email" name="email" value={data.email} onChange={handleChange} required />
                        <input placeholder="Password" type="password" name="password" value={data.password} onChange={handleChange} required />
                        <button className="login-button" disabled={loading}>
                            {loading ? "Logging in..." : "Login as Worker"}
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
