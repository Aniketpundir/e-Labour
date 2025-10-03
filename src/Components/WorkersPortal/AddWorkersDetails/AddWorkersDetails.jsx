import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../../Context/StoreContext";
import image from "../../../assets/101.jpg";
import "./AddWorkersDetails.css";
import Cookies from "js-cookie";

const AddWorkersDetails = () => {
    const { URL_LINK, district, state, city, pinCode } = useContext(StoreContext);
    const navigate = useNavigate();
    const [workerToken, setWorkerToken] = useState("");

    useEffect(() => {
        setWorkerToken(localStorage.getItem("workerToken"));
    }, []);


    const random = [
        {
            name: "Aniket",
            image: image,
            number: "9528756292",
            email: "Aniketpundir@gmail.com",
        },
    ];

    const [Data, setData] = useState({
        // Personal Information
        fullName: random[0]?.name || "",
        fName: "",
        dob: "",
        gender: "",
        profilePhoto: random[0]?.image || null,
        mobile: random[0]?.number || "",
        email: random[0]?.email || "",
        bio: "",

        // Full Address
        state: "",
        city: "",
        street: "",
        zipCode: "",

        // Professional Details
        workCategory: "",
        skills: [],
        skillInput: "",
        experience: "",

        // Availability & Work Preference
        workingHr: "",
        weekends: false,
        rate: "",

        // Emergency & References
        emergencyContact: "",
        reference: "",
    });

    useEffect(() => {
        setData(prev => ({
            ...prev,
            state: state || prev.state,
            city: city || district || prev.city,
            zipCode: pinCode || prev.zipCode,
        }));
    }, [state, city, district, pinCode]);

    const workerSkill = [
        "Plumbing", "Electrical", "Painting", "Carpentry", "Masonry", "Welding", "Mechanic", "Gardening"
    ];


    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setData(prev => ({ ...prev, [name]: checked }));
        } else if (type === "file") {
            setData(prev => ({
                ...prev,
                [name]: files && files.length > 0 ? files[0] : prev[name],
            }));
        } else {
            setData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddSkill = () => {
        if (Data.skillInput && !Data.skills.includes(Data.skillInput)) {
            setData(prev => ({
                ...prev,
                skills: [Data.skillInput, ...prev.skills],
                skillInput: "",
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let newUrl = URL_LINK;
        newUrl += "api/workers/worker/info";

        try {
            const res = await axios.post(newUrl, Data, { headers: { token: workerToken } });
            if (res.data.success) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate("/worker-profile/submission-success");
            } else {
                alert("Profile not submitted.");
            }
        } catch (error) {
            console.error("Error submitting profile:", error);
        }
    };

    return (
        <div className="profile-container">
            <h2>Worker Full Profile</h2>
            <p className="subtitle">Please fill in the details below to verify your profile.</p>

            <form onSubmit={handleSubmit}>
                {/* Personal Info */}
                <section className="profile-section">
                    <h3>1. Personal Information</h3>
                    <div className="form-grid">
                        <div className="worker-profile-photo">
                            <label>Profile Photo *</label>
                            <img src={Data.profilePhoto} alt="Profile" />
                        </div>
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="fullName" value={Data.fullName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Father’s Name *</label>
                            <input type="text" name="fName" value={Data.fName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth *</label>
                            <input type="date" name="dob" value={Data.dob} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select name="gender" value={Data.gender} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option>male</option>
                                <option>female</option>
                                <option>other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Mobile Number *</label>
                            <input type="text" name="mobile" value={Data.mobile} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email Address *</label>
                            <input type="email" name="email" value={Data.email} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Bio *</label>
                            <textarea placeholder="Enter about your self." type="text" name="bio" value={Data.bio} onChange={handleChange}></textarea>
                        </div>
                    </div>
                </section>

                {/* Address */}
                <section className="profile-section">
                    <h3>2. Full Address</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>State *</label>
                            <input type="text" name="state" value={Data.state} onChange={handleChange} readOnly required />
                        </div>
                        <div className="form-group">
                            <label>City *</label>
                            <input type="text" name="city" value={Data.city} onChange={handleChange} readOnly required />
                        </div>
                        <div className="form-group">
                            <label>Locality *</label>
                            <input type="text" name="street" value={Data.street} onChange={handleChange} readOnly required />
                        </div>
                        <div className="form-group">
                            <label>Pin Code *</label>
                            <input type="text" name="zipCode" value={Data.zipCode} onChange={handleChange} readOnly required />
                        </div>
                    </div>
                </section>

                {/* Professional Details */}
                <section className="profile-section">
                    <h3>3. Professional Details</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Work workCategory *</label>
                            <select name="workCategory" value={Data.workCategory} onChange={handleChange}>
                                <option value="">Select</option>
                                <option>Plumber</option>
                                <option>Electrician</option>
                                <option>Painter</option>
                                <option>Carpenter</option>
                                <option>Home Cleaning</option>
                                <option>Electrical</option>
                                <option>Gardening</option>
                                <option>Appliance Repair</option>
                                <option>Painting Service</option>
                                <option>Pest Control</option>
                                <option>Painting Service</option>
                            </select>
                        </div>

                        <div className="form-group selected-skills">
                            <label>Skills *</label>
                            <div className="skills-list">
                                {Data.skills.map((skill, index) => (
                                    <span key={index} className="worker-skill-tag">
                                        {skill}
                                        <button type="button" onClick={() => setData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))}>×</button>
                                    </span>
                                ))}
                            </div>
                            <select name="skillInput" value={Data.skillInput} onChange={handleChange}>
                                <option value="">-- Select Skill --</option>
                                {workerSkill.map((skill, i) => <option key={i} value={skill}>{skill}</option>)}
                            </select>
                            <button type="button" className="add-skill-btn" onClick={handleAddSkill}>Add Skill</button>
                        </div>

                        <div className="form-group">
                            <label>Work experience *</label>
                            <input type="text" name="experience" value={Data.experience} onChange={handleChange} placeholder="Enter experience" />
                        </div>
                    </div>
                </section>

                {/* Availability */}
                <section className="profile-section">
                    <h3>4. Availability & Work Preference</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Working Hours *</label>
                            <input type="text" placeholder="e.g. 9:00AM to 5:00PM" name="workingHr" value={Data.workingHr} onChange={handleChange} />
                        </div>
                        <div className="form-group available-checkbox">
                            <label>Available on weekends *</label>
                            <input type="checkbox" name="weekends" checked={Data.weekends} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Expected rate *</label>
                            <input placeholder="e.g. 450/day" type="text" name="rate" value={Data.rate} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                {/* Emergency */}
                <section className="profile-section">
                    <h3>5. Emergency & References *</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Emergency Contact</label>
                            <input type="text" name="emergencyContact" value={Data.emergencyContact} placeholder="Enter Emergency Contact" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Reference Name *</label>
                            <input placeholder="Enter Reference Name" type="text" name="reference" value={Data.reference} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                <div className="btn-group">
                    <button type="submit" className="btn submit">Submit Profile</button>
                </div>
            </form>
        </div>
    );
};

export default AddWorkersDetails;
