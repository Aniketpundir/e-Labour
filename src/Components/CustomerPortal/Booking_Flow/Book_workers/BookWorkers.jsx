import React, { useState, useContext } from "react";
import "./BookWorkers.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import image from "../../../../assets/101.jpg";
import { StoreContext } from "../../../../Context/StoreContext";

const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Puducherry"
];

const BookWorkers = () => {
    const {
        URL_LINK,
        customerToken,
        addresses,
        loadingAddr,
        selectedAddress,
        setSelectedAddress,
        fetchAddresses,
    } = useContext(StoreContext);

    const [serviceDate, setServiceDate] = useState("Tomorrow");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const Navigate = useNavigate();
    const { title, id } = useParams();

    // ✅ Address State
    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        postOffice: "",
        state: "",
        zip: "",
        save: false,
    });

    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // ✅ Save or Update Address
    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            let baseUrl = URL_LINK + "api/addresses";

            if (editMode) {
                await axios.patch(`${baseUrl}/${editId}`, newAddress, {
                    headers: { token: customerToken },
                });
                alert("Address Updated Successfully ✅");
                fetchAddresses();
            } else if (newAddress.save) {
                const res = await axios.post(baseUrl, newAddress, {
                    headers: { token: customerToken },
                });
                if (res.data.success) {
                    alert("Address Added Successfully ✅");
                    fetchAddresses();
                }
            }

            // Reset form
            setShowForm(false);
            setEditMode(false);
            setEditId(null);
            setNewAddress({
                name: "",
                phone: "",
                street: "",
                city: "",
                postOffice: "",
                state: "",
                zip: "",
                save: false,
            });
        } catch (err) {
            console.error("Error saving address:", err);
        }
    };

    // ✅ Edit address
    const handleEdit = (addr) => {
        setNewAddress({
            name: addr.name || "",
            phone: addr.phone || "",
            street: addr.street || "",
            city: addr.city || "",
            postOffice: addr.postOffice || "",
            state: addr.state || "",
            zip: addr.zip || "",
            save: true,
        });
        setShowForm(true);
        setEditMode(true);
        setEditId(addr._id);
    };

    // ✅ Delete address
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL_LINK}api/addresses/${id}`, {
                headers: { token: customerToken },
            });
            alert("Address Deleted Successfully ❌");
            fetchAddresses();
        } catch (err) {
            console.error("Error deleting address:", err);
        }
    };

    // ✅ Booking
    const handleBooking = async () => {
        const selectedAddrObj = addresses.find(
            (addr) => addr._id === selectedAddress
        );
        if (!selectedAddrObj) return alert("Please select an address!");
        if (!paymentMethod) return alert("Please select a payment method!");

        // ✅ Sirf address ki ID bhejna hai
        const bookingData = {
            workerId: id,
            workerName: "Alexandria Cortez",
            service: title,
            serviceDate: serviceDate,
            addressId: selectedAddrObj,
            paymentMethod: paymentMethod,
        };

        console.log(bookingData)

        // try {
        //     const res = await axios.post(`${URL_LINK}api/bookings`, bookingData, {
        //         headers: { token: customerToken },
        //     });

        //     if (res.data.success) {
        //         alert("Booking Successful ✅");
        //         Navigate(
        //             `/Service-Categories/Listed-Workers/${title}/Worker-Details/${id}/Booking-Section/Booking-Conformation`
        //         );
        //     } else {
        //         alert("Booking failed ❌");
        //     }
        // } catch (err) {
        //     console.error("Booking error:", err);
        //     alert("Something went wrong while booking!");
        // }
        alert("Booking Successful ✅");
        Navigate(
            `/Service-Categories/Listed-Workers/${title}/Worker-Details/${id}/Booking-Section/Booking-Conformation`)
    };

    // ✅ Post Office Lookup
    const [districtQuery, setDistrictQuery] = useState("");
    const [postOffices, setPostOffices] = useState([]);
    const [loadingPO, setLoadingPO] = useState(false);
    const [error, setError] = useState("");

    const fetchPostOfficesByName = async (name) => {
        setLoadingPO(true);
        setError("");
        setPostOffices([]);
        try {
            const trimmed = name.trim();
            if (!trimmed) {
                setError("Please enter a district or post office name first.");
                setLoadingPO(false);
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
                setLoadingPO(false);
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
            setLoadingPO(false);
        }
    };

    return (
        <div className="checkout-container">
            <div className="checkout-box">
                {/* Worker profile */}
                <div className="worker-profiles">
                    <img src={image} alt="Worker" className="worker-avatar" />
                    <div className="worker-info">
                        <h3>Alexandria Cortez</h3>
                        <p className="worker-job">{title}</p>
                        <p className="worker-id">Worker ID: {id}</p>
                    </div>
                </div>

                {/* Service Date */}
                <h2>When would you like your service?</h2>
                <div className="button-group">
                    {["Today", "Tomorrow", "Day after"].map((day) => (
                        <button
                            key={day}
                            className={serviceDate === day ? "active" : ""}
                            onClick={() => setServiceDate(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Address Section */}
                <h2>Address</h2>
                {loadingAddr ? (
                    <p>Loading addresses...</p>
                ) : !showForm ? (
                    <div>
                        {addresses.map((addr) => (
                            <div key={addr._id} className="saved-address-box">
                                <label>
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        value={addr._id}
                                        checked={selectedAddress === addr._id}
                                        onChange={() => setSelectedAddress(addr._id)}
                                    />
                                    <div>
                                        <p>
                                            <b>{addr.name}</b> ({addr.phone})
                                        </p>
                                        <p>
                                            {addr.street}, {addr.city}, {addr.postOffice}
                                        </p>
                                        <p>
                                            {addr.state} - {addr.zip}
                                        </p>
                                    </div>
                                </label>
                                <div className="row">
                                    <button className="edit-address" onClick={() => handleEdit(addr)}>
                                        <CiEdit />
                                    </button>
                                    <button className="edit-address" onClick={() => handleDelete(addr._id)}>
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            className="pay-btn"
                            onClick={() => setShowForm(true)}
                            disabled={addresses.length >= 3}
                        >
                            ➕ Add New Address
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Post Office Lookup */}
                        <section className="post-page">
                            <div className="post-card">
                                <h1 className="post-title">Search your nearest location by your post office.</h1>
                                <span>
                                    Select your local post office here, your Full Address section will be auto-filled.
                                </span>
                                <div style={{ marginTop: "20px" }} className="post-form">
                                    <div className="post-form-row">
                                        <label>
                                            <span>State / Union territory</span>
                                            <select>
                                                <option value="">-- Select State (optional) --</option>
                                                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </label>
                                        <label className="post-grow">
                                            <span>Pin code / District</span>
                                            <input
                                                value={districtQuery}
                                                onChange={(e) => setDistrictQuery(e.target.value)}
                                                placeholder="Enter Pin code or Post office name"
                                            />
                                        </label>
                                    </div>

                                    <div className="post-actions">
                                        <button type="button" disabled={loadingPO} onClick={() => fetchPostOfficesByName(districtQuery)}>
                                            {loadingPO ? "Searching..." : "Search"}
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
                                                        setNewAddress((prev) => ({
                                                            ...prev,
                                                            state: po.state,
                                                            city: po.district,
                                                            postOffice: po.name,
                                                            zip: po.pincode,
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

                        {/* ✅ Address Form */}
                        <form className="form-section" onSubmit={handleAddAddress}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={newAddress.name || ""}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={newAddress.phone || ""}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="street"
                                placeholder="Enter your street address"
                                value={newAddress.street || ""}
                                onChange={handleChange}
                                required
                            />
                            <div className="row">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Enter your city"
                                    value={newAddress.city || ""}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="postOffice"
                                    placeholder="Enter your Post Office"
                                    value={newAddress.postOffice || ""}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            <input
                                type="text"
                                name="state"
                                placeholder="Enter your state"
                                value={newAddress.state || ""}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="zip"
                                placeholder="Enter your ZIP code"
                                value={newAddress.zip || ""}
                                onChange={handleChange}
                                required
                            />

                            <label className="save-address">
                                <input
                                    type="checkbox"
                                    name="save"
                                    checked={!!newAddress.save}
                                    onChange={handleChange}
                                />
                                <p>
                                    I agree to the <span>Terms and conditions</span>
                                </p>
                            </label>

                            <div className="row">
                                <button type="submit" className="pay-btn">
                                    {editMode ? "💾 Update" : "✅ Save"}
                                </button>
                                <button
                                    type="button"
                                    className="pay-btn"
                                    onClick={() => setShowForm(false)}
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {/* Payment Section */}
                <h2>Payment Details</h2>
                <div className="payment-methods">
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                        />
                        Cash on Delivery
                    </label>
                </div>

                <button onClick={handleBooking} className="pay-btn">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default BookWorkers;
