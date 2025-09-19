import React, { useState } from "react";
import "./BookWorkers.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../../../assets/101.jpg"

const BookWorkers = () => {
    const [serviceDate, setServiceDate] = useState("Tomorrow");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const Navigate = useNavigate();


    // Fetch attributes by using useParams().
    const { title, id } = useParams();

    // Create a function for navigator

    const navigateHandle = () => {
        Navigate(`/Service-Categories/Listed-Workers/${title}/Worker-Details/${id}/Booking-Section/Booking-Conformation`)
    }

    // ✅ Store multiple addresses
    const [addresses, setAddresses] = useState([
        {
            id: "1",
            name: "Aniket Pundir",
            phone: "9876543210",
            street: "123 MG Road",
            city: "Dehradun",
            state: "Uttarakhand",
            zip: "248001",
        },
        {
            id: "2",
            name: "Rahul Sharma",
            phone: "9871112233",
            street: "45 Rajpur Road",
            city: "Dehradun",
            state: "Uttarakhand",
            zip: "248002",
        },
        {
            id: "3",
            name: "Rahul Sharma",
            phone: "9871112233",
            street: "45 Rajpur Road",
            city: "Dehradun",
            state: "Uttarakhand",
            zip: "248002",
        },
    ]);

    const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);

    // ✅ New/Edit address form state
    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        save: false,
    });

    // ✅ Handle form input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // ✅ Handle adding/updating address
    const handleAddAddress = (e) => {
        e.preventDefault();

        if (editMode) {
            // update existing address
            setAddresses(
                addresses.map((addr) =>
                    addr.id === editId ? { ...addr, ...newAddress } : addr
                )
            );
            setEditMode(false);
            setEditId(null);
        } else if (newAddress.save) {
            // add new address
            const newId = Date.now().toString();
            setAddresses([...addresses, { id: newId, ...newAddress }]);
            setSelectedAddress(newId);
        }

        setShowForm(false);
        setNewAddress({
            name: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            save: false,
        });
    };

    // ✅ Handle edit
    const handleEdit = (addr) => {
        setNewAddress({ ...addr, save: true }); // pre-fill form
        setShowForm(true);
        setEditMode(true);
        setEditId(addr.id);
    };

    // ✅ Handle delete
    const handleDelete = (id) => {
        const filtered = addresses.filter((addr) => addr.id !== id);
        setAddresses(filtered);
        if (selectedAddress === id && filtered.length > 0) {
            setSelectedAddress(filtered[0].id);
        }
    };


    const handleBooking = () => {
        const selectedAddrObj = addresses.find((addr) => addr.id === selectedAddress);

        if (!selectedAddrObj) {
            alert("Please select an address!");
            return;
        }

        if (!paymentMethod) {
            alert("Please select a payment method!");
            return;
        }

        // ✅ Booking object create karo
        const bookingData = {
            workerName: "Alexandria Cortez", // Worker ka naam
            workerId: id,                    // useParams se
            serviceDate: serviceDate,        // 🆕 Selected service date add
            address: selectedAddrObj,        // Selected address object
            paymentMethod: paymentMethod,    // Payment method
            service: title,                  // A service that provide worker
        };

        console.log("Booking Object:", bookingData);

        navigateHandle();
    };

    return (
        <div className="checkout-container">
            <div className="checkout-box">
                <div className="worker-profile">
                    <img
                        src={image}
                        alt="Worker"
                        className="worker-avatar"
                    />
                    <div className="worker-info">
                        <h3>Alexandria Cortez</h3>
                        <p className="worker-job">{title}</p>
                        <p className="worker-id">Worker ID: {id}</p>
                    </div>
                </div>

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

                <h2>Address</h2>

                {!showForm ? (
                    <div>
                        {addresses.map((addr) => (
                            <div key={addr.id} className="saved-address-box">
                                <label>
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        value={addr.id}
                                        checked={selectedAddress === addr.id}
                                        onChange={() =>
                                            setSelectedAddress(addr.id)
                                        }
                                    />
                                    <div>
                                        <p>
                                            <b>{addr.name}</b> ({addr.phone})
                                        </p>
                                        <p>
                                            {addr.street}, {addr.city}
                                        </p>
                                        <p>
                                            {addr.state} - {addr.zip}
                                        </p>
                                    </div>
                                </label>
                                <div className="row">
                                    <button
                                        className="edit-address"
                                        onClick={() => handleEdit(addr)}
                                    >
                                        <CiEdit />
                                    </button>
                                    <button
                                        className="edit-address"
                                        onClick={() => handleDelete(addr.id)}
                                    >
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
                            placeholder="Enter your street address"
                            value={newAddress.street}
                            onChange={handleChange}
                            required
                        />
                        <div className="row">
                            <input
                                type="text"
                                name="city"
                                placeholder="Enter your city"
                                value={newAddress.city}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="Enter your state"
                                value={newAddress.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="zip"
                            placeholder="Enter your ZIP code"
                            value={newAddress.zip}
                            onChange={handleChange}
                            required
                        />
                        <label className="save-address">
                            <input
                                type="checkbox"
                                name="save"
                                checked={newAddress.save}
                                onChange={handleChange}
                            />{" "}
                            <p>I agree to the <span>Terms and conditions</span></p>
                        </label>

                        <div className="row">
                            <button type="submit" className="pay-btn">
                                {editMode ? "💾 Update" : "✅ Save"}
                            </button>
                            <button
                                type="button"
                                className="pay-btn"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditMode(false);
                                    setNewAddress({
                                        name: "",
                                        phone: "",
                                        street: "",
                                        city: "",
                                        state: "",
                                        zip: "",
                                        save: false,
                                    });
                                }}
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </form>
                )}

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

                <button onClick={() => { handleBooking() }} className="pay-btn">Book Now</button>
            </div>
        </div>
    );
};

export default BookWorkers;