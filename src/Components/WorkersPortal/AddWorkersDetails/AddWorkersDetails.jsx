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
        skills: "",
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
        formData.append("skills", Data.skills);
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
                        <div className="form-group">
                            <label>Full Address</label>
                            <textarea
                                name="address"
                                value={Data.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                            ></textarea>
                        </div>
                    </div>
                </section>

                {/* <section className="profile-section">
                    <h3>2. Identity Verification</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Aadhar Card</label>
                            <input
                                type="text"
                                name="aadhar"
                                value={Data.aadhar}
                                onChange={handleChange}
                                placeholder="Enter Aadhar number"
                            />
                        </div>
                        <div className="form-group">
                            <label>Upload Document</label>
                            <input
                                type="file"
                                name="aadharDoc"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </section> */}

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
                        <div className="form-group">
                            <label>Skills</label>
                            <input
                                type="text"
                                name="skills"
                                value={Data.skills}
                                onChange={handleChange}
                                placeholder="Enter skills"
                            />
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
                        <div className="form-group">
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

                {/* <section className="profile-section">
                    <h3>5. Banking & Payments</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                value={Data.bankName}
                                onChange={handleChange}
                                placeholder="Enter bank name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Account Number</label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={Data.accountNumber}
                                onChange={handleChange}
                                placeholder="Enter account number"
                            />
                        </div>
                        <div className="form-group">
                            <label>IFSC Code</label>
                            <input
                                type="text"
                                name="ifsc"
                                value={Data.ifsc}
                                onChange={handleChange}
                                placeholder="Enter IFSC"
                            />
                        </div>
                    </div>
                </section> */}

                <section className="profile-section">
                    <h3>6. Emergency & References</h3>
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

                {/* <section className="profile-section">
                    <h3>7. Document Upload</h3>
                    <input
                        type="file"
                        name="documents"
                        multiple
                        onChange={handleChange}
                    />
                </section> */}

                <div className="btn-group">
                    <button onClick={() => { Navigate("/worker-profile/submission-success"), handleClick() }} type="submit" className="btn submit">
                        Submit Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddWorkersDetails;
