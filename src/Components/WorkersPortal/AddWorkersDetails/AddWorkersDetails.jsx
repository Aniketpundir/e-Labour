import React, { useContext, useState } from "react";
import "./AddWorkersDetails.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../../Context/StoreContext"

const AddWorkersDetails = () => {
    const { URL_LINK } = useContext(StoreContext)
    const [Data, setData] = useState({
        // Personal Information
        fullName: "",
        fatherName: "",
        dob: "",
        gender: "",
        profilePhoto: null,
        mobile: "",
        email: "",

        // Full Address
        state: "",
        city: "",
        street: "",
        zipCode: "",

        // Professional Details
        category: "",
        skills: [], // ✅ array banaya hai
        skillInput: "", // ✅ skill input ke liye
        experience: "",

        // Availability & Work Preference
        workingHours: "",
        weekends: false,
        salary: "",

        // Emergency & References
        emergencyContact: "",
        reference: "",
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === "file") {
            if (name === "documents") {
                // multiple files
                setData((prev) => ({
                    ...prev,
                    [name]: files ? Array.from(files) : [],
                }));
            } else {
                // single file
                setData((prev) => ({
                    ...prev,
                    [name]: files && files.length > 0 ? files[0] : prev[name],
                }));
            }
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // Personal Information
        formData.append("fullName", Data.fullName); // Already filled
        formData.append("fatherName", Data.fatherName);
        formData.append("dob", Data.dob);
        formData.append("gender", Data.gender);
        formData.append("profilePhoto", Data.profilePhoto); // Already filled
        formData.append("mobile", Data.mobile); // Already filled
        formData.append("email", Data.email); // Already filled

        // Full Address
        formData.append("state", Data.state);
        formData.append("city", Data.city);
        formData.append("street".Data.street);
        formData.append("zipCode", Data.zipCode);

        // Professional Details
        formData.append("category", Data.category);
        formData.append("skills", JSON.stringify(Data.skills));
        formData.append("experience", Data.experience);

        // Availability & Work Preference
        formData.append("workingHours", Data.workingHours);
        formData.append("weekends", Data.weekends);
        formData.append("salary", Data.salary);

        // Emergency & References
        formData.append("emergencyContact", Data.emergencyContact);
        formData.append("reference", Data.reference);

        let newURL = URL_LINK;
        newURL += "/";

        try {
            const res = await axios.post(newURL, formData);
            if (res.status.success) {
                alert("Profile submitted successfully!");
            } else {
                alert("Profile not submitted.");
            }
        } catch (error) {
            console.error("error submitting profile:", error);
        }
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const workerSkill = [
        "Plumbing",
        "Electrical",
        "Painting",
        "Carpentry",
        "Masonry",
        "Welding",
        "Mechanic",
        "Gardening"
    ];

    return (
        <div className="profile-container">
            <h2>Worker Full Profile</h2>
            <p className="subtitle">
                Please fill in the details below to verify your profile.
            </p>

            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <section className="profile-section">
                    <h3>1. Personal Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={Data.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Father’s Name</label>
                            <input
                                type="text"
                                name="fatherName"
                                value={Data.fatherName}
                                onChange={handleChange}
                                placeholder="Enter father’s name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={Data.dob}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={Data.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Profile Photo</label>
                            <input
                                type="file"
                                name="profilePhoto"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                name="mobile"
                                value={Data.mobile}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={Data.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </div>
                    </div>
                </section>


                {/* ///// */}


                <section className="profile-section">
                    <h3>2. Full Address</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                name="state"
                                value={Data.state}
                                onChange={handleChange}
                                placeholder="Enter your state name."
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={Data.city}
                                onChange={handleChange}
                                placeholder="Enter your city name."
                            />
                        </div>
                        <div className="form-group">
                            <label>Locality</label>
                            <input
                                type="text"
                                name="street"
                                value={Data.street}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Pin Code (Zip Code)</label>
                            <input
                                type="text"
                                name="zipCode"
                                value={Data.zipCode}
                                onChange={handleChange}
                                placeholder="Enter you Pin code (Zip Code) here."
                            />
                        </div>
                    </div>
                </section>

                <section className="profile-section">
                    <h3>3. Professional Details</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Work Category</label>
                            <select
                                name="category"
                                value={Data.category}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option>Plumber</option>
                                <option>Electrician</option>
                                <option>Painter</option>
                            </select>
                        </div>

                        {/* ✅ Skills Input */}
                        <div className="form-group selected-skills">
                            <label>Skills</label>
                            {/* Display all selected skills with individual remove buttons */}
                            <div className="skills-list seleted-skills ">
                                {Data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="worker-skill-tag"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    skills: prev.skills.filter((s) => s !== skill),
                                                }))
                                            }
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* Dropdown to select a skill */}
                            <select
                                name="skillInput"
                                value={Data.skillInput}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Skill --</option>
                                {workerSkill.map((skill, index) => (
                                    <option key={index} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>

                            {/* Add Skill button */}
                            <button
                                type="button"
                                className="add-skill-btn"
                                onClick={() => {
                                    if (Data.skillInput && !Data.skills.includes(Data.skillInput)) {
                                        setData((prev) => ({
                                            ...prev,
                                            skills: [Data.skillInput, ...prev.skills],
                                            skillInput: "",
                                        }));
                                    }
                                }}
                            >
                                Add Skill
                            </button>
                        </div>

                        <div className="form-group">
                            <label>Work Experience</label>
                            <input
                                type="text"
                                name="experience"
                                value={Data.experience}
                                onChange={handleChange}
                                placeholder="Enter experience"
                            />
                        </div>
                    </div>
                </section>

                <section className="profile-section">
                    <h3>4. Availability & Work Preference</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Working Hours</label>
                            <input
                                type="text"
                                name="workingHours"
                                value={Data.workingHours}
                                onChange={handleChange}
                                placeholder="e.g. 9am - 6pm"
                            />
                        </div>
                        <div className="form-group available-checkbox">
                            <label>Available on Weekends</label>
                            <input
                                type="checkbox"
                                name="weekends"
                                checked={Data.weekends}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expected Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={Data.salary}
                                onChange={handleChange}
                                placeholder="Enter salary expectation"
                            />
                        </div>
                    </div>
                </section>

                <section className="profile-section">
                    <h3>5. Emergency & References</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Emergency Contact</label>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={Data.emergencyContact}
                                onChange={handleChange}
                                placeholder="Enter emergency number"
                            />
                        </div>
                        <div className="form-group">
                            <label>Reference Name</label>
                            <input
                                type="text"
                                name="reference"
                                value={Data.reference}
                                onChange={handleChange}
                                placeholder="Enter reference name"
                            />
                        </div>
                    </div>
                </section>

                <div className="btn-group">
                    <button onClick={() => { Navigate("/worker-profile/submission-success"), handleClick() }} type="submit" className="btn submit">
                        Submit Profile
                    </button>
                </div>
            </form>
        </div >
    );
};

export default AddWorkersDetails;
