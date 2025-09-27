import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../../Context/StoreContext";
import image from "../../../assets/101.jpg";
import "./AddWorkersDetails.css";

const AddWorkersDetails = () => {
    const { URL_LINK } = useContext(StoreContext);
    const navigate = useNavigate();

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
        fatherName: "",
        dob: "",
        gender: "",
        profilePhoto: random[0]?.image || null,
        mobile: random[0]?.number || "",
        email: random[0]?.email || "",

        // Full Address
        state: "",
        city: "",
        street: "",
        zipCode: "",

        // Professional Details
        category: "",
        skills: [],
        skillInput: "",
        experience: "",

        // Availability & Work Preference
        workingHours: "",
        weekends: false,
        salary: "",

        // Emergency & References
        emergencyContact: "",
        reference: "",
    });

    const STATES = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
        "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
        "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Puducherry"
    ];

    const workerSkill = [
        "Plumbing", "Electrical", "Painting", "Carpentry", "Masonry", "Welding", "Mechanic", "Gardening"
    ];

    // Post office lookup
    const [selectedState, setSelectedState] = useState("");
    const [districtQuery, setDistrictQuery] = useState("");
    const [postOffices, setPostOffices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPostOfficesByName = async (name) => {
        setLoading(true);
        setError("");
        setPostOffices([]);
        try {
            const trimmed = name.trim();
            if (!trimmed) {
                setError("Please enter a district or post office name first.");
                setLoading(false);
                return;
            }

            let responses = [];
            if (/^\d{6}$/.test(trimmed)) {
                const res = await fetch(`https://api.postalpincode.in/pincode/${trimmed}`);
                responses = await res.json();
            } else {
                const res = await fetch(`https://api.postalpincode.in/postoffice/${encodeURIComponent(trimmed)}`);
                responses = await res.json();
            }

            if (!Array.isArray(responses) || responses.length === 0) {
                setError("No results from Postal API.");
                setLoading(false);
                return;
            }

            const poList = [];
            responses.forEach((r) => {
                if (r && Array.isArray(r.PostOffice)) {
                    r.PostOffice.forEach((po) => {
                        poList.push({
                            name: po.Name,
                            pincode: po.Pincode,
                            district: po.District,
                            state: po.State,
                            type: po.OfficeType || "",
                        });
                    });
                }
            });

            setPostOffices(poList);
        } catch (err) {
            console.error(err);
            setError("There was an error querying the Postal API.");
        } finally {
            setLoading(false);
        }
    };

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

        const formData = new FormData();
        Object.keys(Data).forEach(key => {
            if (key === "skills") {
                formData.append(key, JSON.stringify(Data[key]));
            } else {
                formData.append(key, Data[key]);
            }
        });

        try {
            const res = await axios.post(URL_LINK + "/", formData);
            if (res.data.success) {
                alert("Profile submitted successfully!");
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
                            <input type="text" name="fatherName" value={Data.fatherName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth *</label>
                            <input type="date" name="dob" value={Data.dob} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select name="gender" value={Data.gender} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
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
                    </div>
                </section>

                {/* Post Office Lookup */}
                <section className="post-page">
                    <div className="post-card">
                        <h1 className="post-title">Search your nearest location by your post office.</h1>
                        <span>When you select your local post office here, your Full Address section will be automatically filled.<br />(जब आप यहां अपना स्थानीय डाकघर चयन करेंगे, तो आपका पूरा पता अनुभाग स्वचालित रूप से भर जाएगा।)</span>
                        <div style={{ marginTop: "20px" }} className="post-form">
                            <div className="post-form-row">
                                <label>
                                    <span>State</span>
                                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                                        <option value="">-- Select State (optional) --</option>
                                        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </label>

                                <label className="post-grow">
                                    <span>Pin code (Zip code)</span>
                                    <input
                                        value={districtQuery}
                                        onChange={(e) => setDistrictQuery(e.target.value)}
                                        placeholder={selectedState ? `Type district or post office in ${selectedState}` : "Type district, town, post office or PIN"}
                                        required
                                    />
                                </label>
                            </div>

                            <div className="post-actions">
                                <button type="button" disabled={loading} onClick={() => fetchPostOfficesByName(districtQuery)}>
                                    {loading ? "Searching..." : "Search"}
                                </button>
                                <div className="post-result-count">Results: {postOffices.length}</div>
                            </div>

                            {error && <div className="post-error">{error}</div>}

                            {postOffices.length > 0 && (
                                <div className="post-results">
                                    {postOffices.map((po) => (
                                        <div
                                            key={`${po.name}-${po.pincode}`}
                                            className="post-result-card"
                                            onClick={() => {
                                                // Update Data state directly
                                                setData(prev => ({
                                                    ...prev,
                                                    state: po.state,
                                                    city: po.district,
                                                    street: po.name,
                                                    zipCode: po.pincode
                                                }));
                                                setPostOffices([]);
                                                setDistrictQuery("");
                                            }}
                                        >
                                            <div className="po-name">{po.name}</div>
                                            <div className="po-info">{po.district}, {po.state} — PIN {po.pincode}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                            <label>Work Category *</label>
                            <select name="category" value={Data.category} onChange={handleChange}>
                                <option value="">Select</option>
                                <option>Plumber</option>
                                <option>Electrician</option>
                                <option>Painter</option>
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
                            <label>Work Experience *</label>
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
                            <input type="text" name="workingHours" value={Data.workingHours} onChange={handleChange} />
                        </div>
                        <div className="form-group available-checkbox">
                            <label>Available on Weekends *</label>
                            <input type="checkbox" name="weekends" checked={Data.weekends} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Expected Salary *</label>
                            <input type="text" name="salary" value={Data.salary} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                {/* Emergency */}
                <section className="profile-section">
                    <h3>5. Emergency & References *</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Emergency Contact</label>
                            <input type="text" name="emergencyContact" value={Data.emergencyContact} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Reference Name *</label>
                            <input type="text" name="reference" value={Data.reference} onChange={handleChange} />
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
