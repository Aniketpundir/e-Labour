import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerSignup.css";
import OTPButton from "../../OtpButton/OtpButton";
////////

import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

// 👇 Import cropper components
import ImageCropper from "../../ImageCrop/ImageCropper";
import { getCroppedImg } from "../../ImageCrop/cropImage.js";
import axios from "axios";
import { StoreContext } from "../../../Context/StoreContext.jsx";

const CustomerSignup = () => {
    const { URL_LINK } = useContext(StoreContext)
    const role = "customer";
    const [showPassword, setShowPassword] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [data, setData] = useState({
        fullName: "",
        email: "",
        opt: "",
        mobileNumber: "",
        password: ""
    });

    // console.log(URL_LINK)

    const email = data.email;

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const Navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.fullName);
        formData.append("email", data.email);
        // formData.append("opt", data.opt);
        formData.append("phone", data.mobileNumber);
        formData.append("password", data.password);
        formData.append("isTAndCAgree", checkbox);
        formData.append("image", file);
        formData.append("role", role);

        let newUrl = URL_LINK;
        newUrl += "api/users/register";

        try {
            const res = await axios.post(newUrl, formData);
            if (!res.data.success) {
                alert(res.data.success)
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const sendOTP = async (e) => {
        e.preventDefault();
        let newUrl = URL_LINK;
        newUrl += "api/otp";
        console.log("Send");

        try {
            const res = await axios.post(newUrl, { email });
            if (!res.data.success) {
                alert("Enter email first.")
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

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
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />

                    {/* <div className="otp-section">
                        <input
                            placeholder="Enter One Time Password(OTP)"
                            type="text"
                            name="opt"
                            value={data.opt}
                            onChange={handleChange}
                            required
                        />
                        <span onClick={sendOTP}>
                            <OTPButton />
                        </span>
                    </div> */}

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
                            {showPassword ? <BiShow /> : <BiHide />}
                        </p>
                    </div>

                    <h5>
                        <input type="checkbox" onClick={handleClick} /> I agree to the{" "}
                        <span>Terms & Conditions</span>
                    </h5>

                    <button type="submit" className="submit-button">
                        Create Customer Account
                    </button>
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
