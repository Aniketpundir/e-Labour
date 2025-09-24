import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from "../../../redux/slices/CustomerAuthSlice.js";
import "./CustomerSignup.css";
import OTPButton from "../../OtpButton/OtpButton";

// 👇 Import cropper components
import ImageCropper from "../../ImageCrop/ImageCropper";
import { getCroppedImg } from "../../ImageCrop/cropImage.js";

const CustomerSignup = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [data, setData] = useState({
        fullName: "",
        emailId: "",
        opt: "",
        mobileNumber: "",
        password: ""
    });

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const Navigate = useNavigate();

    // ✅ Access Redux state safely
    const { loading, error } = useSelector((state) => state.UserAuth || {}); // <-- FIXED

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClick = () => setCheckbox((prev) => !prev);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImage(URL.createObjectURL(selectedFile));
            setShowCropper(true);
        }
    };

    const handleCropDone = async (croppedAreaPixels) => {
        const croppedImgUrl = await getCroppedImg(image, croppedAreaPixels);
        setCroppedImage(croppedImgUrl);
        setShowCropper(false);
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setFile(null);
        setImage(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("emailId", data.emailId);
        formData.append("opt", data.opt);
        formData.append("mobileNumber", data.mobileNumber);
        formData.append("password", data.password);
        formData.append("checkbox", checkbox);
        formData.append("profileImage", file);

        dispatch(signupUser(formData)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                alert("Signup Success!");
                Navigate("/customer-login");
            } else {
                alert("Signup Failed: " + res.payload);
            }
        });
    };

    return (
        <div className="CustomerSignup">
            <div data-aos="fade-right" className="CustomerSignup-form">
                <h2>Create your customer account</h2>
                <p>
                    Already have an account?{" "}
                    <span onClick={() => Navigate("/customer-login")}>Sign in</span>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="profile-image">
                        <label>Select your profile image</label>

                        {croppedImage ? (
                            <img
                                src={croppedImage}
                                alt="Profile Preview"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    display: "block",
                                    marginBottom: "10px",
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    background: "#ddd",
                                    marginBottom: "10px",
                                }}
                            />
                        )}

                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <input
                        placeholder="Full Name"
                        type="text"
                        name="fullName"
                        value={data.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder="Email address"
                        type="email"
                        name="emailId"
                        value={data.emailId}
                        onChange={handleChange}
                        required
                    />

                    <div className="otp-section">
                        <input
                            placeholder="Enter One Time Password(OTP)"
                            type="text"
                            name="opt"
                            value={data.opt}
                            onChange={handleChange}
                            required
                        />
                        <OTPButton />
                    </div>

                    <input
                        placeholder="Mobile Number"
                        type="text"
                        name="mobileNumber"
                        value={data.mobileNumber}
                        onChange={handleChange}
                        required
                    />

                    <div className="input-field1">
                        <input
                            placeholder="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                        <p onClick={() => setShowPassword(!showPassword)} className="hide-show">
                            {showPassword ? "Hide.." : "Show"}
                        </p>
                    </div>

                    <h5>
                        <input type="checkbox" onClick={handleClick} /> I agree to the{" "}
                        <span>Terms & Conditions</span>
                    </h5>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Customer Account"}
                    </button>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>

            {showCropper && (
                <ImageCropper
                    image={image}
                    onCropDone={handleCropDone}
                    onCropCancel={handleCropCancel}
                />
            )}
        </div>
    );
};

export default CustomerSignup;
