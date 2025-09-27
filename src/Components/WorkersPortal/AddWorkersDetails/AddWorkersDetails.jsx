import React, { useState } from "react";
import "./AddWorkersDetails.css";
import { useNavigate } from "react-router-dom";

const AddWorkersDetails = () => {
    const Navigate = useNavigate();
    const [Data, setData] = useState({
        fullName: "",
        fatherName: "",
        dob: "",
        gender: "",
        profilePhoto: null,
        mobile: "",
        email: "",
        address: "",
        aadhar: "",
        aadharDoc: null,
        category: "",
        skills: [], // ✅ array banaya hai
        skillInput: "", // ✅ skill input ke liye
        experience: "",
        area: "",
        workingHours: "",
        weekends: false,
        salary: "",
        bankName: "",
        accountNumber: "",
        ifsc: "",
        emergencyContact: "",
        reference: "",
        documents: [], // multiple files
        ///////////

        state: "",
        city: "",
        street: "",
        zipCode: "",
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

    // ✅ skill add karne ka function
    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" && Data.skillInput.trim() !== "") {
            e.preventDefault();
            if (!Data.skills.includes(Data.skillInput.trim())) {
                setData((prev) => ({
                    ...prev,
                    skills: [...prev.skills, prev.skillInput.trim()],
                    skillInput: "",
                }));
            }
        }
    };

    // ✅ skill remove karne ka function
    const removeSkill = (skill) => {
        setData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", Data.fullName);
        formData.append("fatherName", Data.fatherName);
        formData.append("dob", Data.dob);
        formData.append("gender", Data.gender);
        if (Data.profilePhoto) formData.append("profilePhoto", Data.profilePhoto);
        formData.append("mobile", Data.mobile);
        formData.append("email", Data.email);
        formData.append("address", Data.address);
        formData.append("aadhar", Data.aadhar);
        if (Data.aadharDoc) formData.append("aadharDoc", Data.aadharDoc);
        formData.append("category", Data.category);

        // ✅ skills ko JSON ke form me bhejna
        formData.append("skills", JSON.stringify(Data.skills));

        formData.append("experience", Data.experience);
        formData.append("area", Data.area);
        formData.append("workingHours", Data.workingHours);
        formData.append("weekends", Data.weekends);
        formData.append("salary", Data.salary);
        formData.append("bankName", Data.bankName);
        formData.append("accountNumber", Data.accountNumber);
        formData.append("ifsc", Data.ifsc);
        formData.append("emergencyContact", Data.emergencyContact);
        formData.append("reference", Data.reference);

        // ✅ multiple documents
        if (Data.documents.length > 0) {
            Data.documents.forEach((file) => {
                formData.append("documents", file);
            });
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const res = await fetch("http://localhost:5000/api/workers", {
                method: "POST",
                body: formData, // ✅ fixed
            });

            const data = await res.json();
            console.log("✅ Submitted successfully:", data);
            alert("Profile submitted successfully!");
        } catch (error) {
            console.error("❌ Error submitting profile:", error);
        }
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    ///////////////

    const skills = [
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
                        <div className="form-group seleted-skills">
                            <label>Skills</label>
                            <div className="skills-input seleted-skills">
                                {Data.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">
                                        {skill}
                                        <button
                                            className="skill-button"
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}

                                {/* 🆕 Dropdown instead of free text input */}
                                <select
                                    name="skillInput"
                                    value={Data.skillInput}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select Skill --</option>
                                    {skills.map((skill, index) => (
                                        <option key={index} value={skill}>
                                            {skill}
                                        </option>
                                    ))}
                                </select>

                                {/* 🆕 Add button to push dropdown value into skills list */}
                                <button
                                    type="button"
                                    className="add-skill-btn"
                                    onClick={() => {
                                        if (Data.skillInput && !Data.skills.includes(Data.skillInput)) {
                                            setData((prev) => ({
                                                ...prev,
                                                skills: [...prev.skills, Data.skillInput],
                                                skillInput: "",
                                            }));
                                        }
                                    }}
                                >
                                    Add
                                </button>
                            </div>

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
                        <div className="form-group">
                            <label>Local Area</label>
                            <input
                                type="text"
                                name="area"
                                value={Data.area}
                                onChange={handleChange}
                                placeholder="Enter location"
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
