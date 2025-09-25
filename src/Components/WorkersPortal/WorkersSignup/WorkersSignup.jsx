import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkersSignup.css";
import OTPButton from "../../OtpButton/OtpButton";
import ImageCropper from "../../ImageCrop/ImageCropper";
import { getCroppedImg } from "../../ImageCrop/cropImage.js";

const WorkersSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [data, setData] = useState({
        fullName: "", emailId: "", opt: "", mobileNumber: "", password: "",
    });
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const Navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = () => setCheckbox(prev => !prev);

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
        formData.append("fullName", data.fullName);
        formData.append("emailId", data.emailId);
        formData.append("opt", data.opt);
        formData.append("mobileNumber", data.mobileNumber);
        formData.append("password", data.password);
        formData.append("checkbox", checkbox);
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="WorkersSignup">
            <div className="WorkersSignup-form">
                <h2>Create your worker account</h2>
                <p>
                    Already have an account? <span onClick={() => Navigate("/workers-login")}>Sign in</span>
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Profile picture */}
                    <div className="profile-image">
                        <label>Select your profile image</label>
                        {croppedImage ? (
                            <img src={croppedImage} alt="Profile Preview" style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", marginBottom: 10 }} />
                        ) : <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#ddd", marginBottom: 10 }} />}
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {/* Inputs */}
                    <input placeholder="Full Name" type="text" name="fullName" value={data.fullName} onChange={handleChange} required />
                    <input placeholder="Email address" type="email" name="emailId" value={data.emailId} onChange={handleChange} required />
                    <div className="otp-section">
                        <input placeholder="Enter OTP" type="text" name="opt" value={data.opt} onChange={handleChange} required />
                        <OTPButton />
                    </div>
                    <input placeholder="Mobile Number" type="text" name="mobileNumber" value={data.mobileNumber} onChange={handleChange} required />
                    <div className="input-field1">
                        <input placeholder="Password" type={showPassword ? "text" : "password"} name="password" value={data.password} onChange={handleChange} required />
                        <p onClick={() => setShowPassword(!showPassword)} className="hide-show">{showPassword ? "Hide" : "Show"}</p>
                    </div>
                    <h5>
                        <input type="checkbox" onClick={handleCheckbox} /> I agree to the <span>Terms & Conditions</span>
                    </h5>
                    <button onClick={() => { Navigate("/worker-profile/add-workers-details"), handleClick() }} type="submit" className="submit-button">
                        Create Worker Account
                    </button>
                </form>
            </div>

            {/* Cropper modal */}
            {showCropper && (
                <ImageCropper image={image} onCropDone={handleCropDone} onCropCancel={handleCropCancel} />
            )}
        </div>
    );
};

export default WorkersSignup;
