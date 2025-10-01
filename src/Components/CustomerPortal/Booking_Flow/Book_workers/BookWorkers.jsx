import React, { useState, useContext, useEffect } from "react";
import "./BookWorkers.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import image from "../../../../assets/101.jpg";
import { StoreContext } from "../../../../Context/StoreContext";


const BookWorkers = () => {
    const {
        URL_LINK,
        customerToken,
        addresses,
        loadingAddr,
        selectedAddress,
        setSelectedAddress,
        fetchAddresses,
        // Location from context
        state,
        district,
        pinCode,
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
        city: district || "",
        zipCode: pinCode || "",
        state: state || "",
        save: false,
    });

    // ✅ Sync with context city/state/pincode if they change
    useEffect(() => {
        setNewAddress((prev) => ({
            ...prev,
            city: prev.city || district || "",
            zipCode: prev.zipCode || pinCode || "",
            state: prev.state || state || "",
        }));
    }, [district, state, pinCode]);

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
                city: district || "",
                zipCode: pinCode || "",
                state: state || "",
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
            city: addr.city || city || "",
            zipCode: addr.zipCode || pinCode || "",
            state: addr.state || state || "",
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

        const bookingData = {
            workerId: id,
            workerName: "Alexandria Cortez",
            service: title,
            serviceDate: serviceDate,
            addressId: selectedAddrObj,
            paymentMethod: paymentMethod,
        };

        console.log(bookingData);

        alert("Booking Successful ✅");
        Navigate(
            `/Service-Categories/Listed-Workers/${title}/Worker-Details/${id}/Booking-Section/Booking-Conformation`
        );
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
                                            {addr.street}, {addr.city},
                                        </p>
                                        <p>
                                            {addr.state} - {addr.zipCode}
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
                            onClick={() => {
                                setNewAddress({
                                    name: "",
                                    phone: "",
                                    street: "",
                                    city: district || "",
                                    zipCode: pinCode || "",
                                    state: state || "",
                                    zip: "",
                                    save: false,
                                });
                                setShowForm(true);
                                setEditMode(false);
                                setEditId(null);
                            }}
                            disabled={addresses.length >= 3}
                        >
                            ➕ Add New Address
                        </button>
                    </div>
                ) : (
                    <>
                        {/* ✅ Address Form */}
                        <form className="form-section" onSubmit={handleAddAddress}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={newAddress.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={newAddress.phone}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="street"
                                placeholder="House No./Village Name/Landmark"
                                value={newAddress.street}
                                onChange={handleChange}
                                required
                            />
                            <div className="row">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Enter your city"
                                    value={newAddress.city || district || ""}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="Enter your pin code"
                                    value={newAddress.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name="state"
                                placeholder="Enter your state"
                                value={newAddress.state}
                                onChange={handleChange}
                                required
                            />

                            <label className="save-address">
                                <input
                                    type="checkbox"
                                    name="save"
                                    checked={!!newAddress.save}
                                    onChange={handleChange}
                                    required
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
