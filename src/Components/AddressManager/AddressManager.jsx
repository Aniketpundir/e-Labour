// 📁 components/AddressManager.jsx
import React, { useState, useContext } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import "./AddressManager.css"
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "react-redux";


const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Puducherry"
];

const AddressManager = () => {
    const {
        URL_LINK,
        customerToken,
        addresses,
        loadingAddr,
        selectedAddress,
        setSelectedAddress,
        fetchAddresses,
    } = useContext(StoreContext);

    const [addressId, setAddressId] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAddress({ ...newAddress, [name]: type === "checkbox" ? checked : value });
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            let baseUrl = URL_LINK + "api/addresses";

            if (editMode) {
                await axios.patch(`${baseUrl}/${editId}`, newAddress, {
                    headers: { token: customerToken },
                });
                alert("Address Updated Successfully ✅");
            } else if (newAddress.save) {
                const res = await axios.post(baseUrl, newAddress, {
                    headers: { token: customerToken },
                });
                if (res.data.success) {
                    alert("Address Added Successfully ✅");
                }
            }

            fetchAddresses();
            resetForm();

        } catch (err) {
            console.error("Error saving address:", err);
        }
    };

    const resetForm = () => {
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
    };

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

    const Navigate = useNavigate();
    const { title } = useParams();

    const handleNavigate = () => {
        Navigate(`/Service-Categories/aadress/${title}/${addressId}`)
    }

    return (
        <div className="address-manager-container">
            <div className="address-manager">
                <h2>Address</h2>
                {loadingAddr ? (
                    <p>Loading addresses...</p>
                ) : !showForm ? (
                    <>
                        {addresses.map((addr) => (
                            <div key={addr._id} className="address-manager-box">
                                <label>
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        value={addr._id}
                                        checked={selectedAddress === addr._id}
                                        onChange={() => {
                                            setSelectedAddress(addr._id);
                                            setAddressId(addr._id);
                                        }}
                                    />
                                    <div>
                                        <p><b>{addr.name}</b> ({addr.phone})</p>
                                        <p>{addr.street}, {addr.city}, {addr.postOffice}</p>
                                        <p>{addr.state} - {addr.zip}</p>
                                    </div>
                                </label>
                                <div className="row">
                                    <button onClick={() => handleEdit(addr)}><CiEdit /></button>
                                    <button onClick={() => handleDelete(addr._id)}><MdDelete /></button>
                                </div>
                            </div>
                        ))}
                        <div className="buttons-container">
                            <button
                                className="add-address-btn"
                                onClick={() => setShowForm(true)}
                                disabled={addresses.length >= 3}
                            >
                                ➕ Add New Address
                            </button>

                            <button className="see-worker-btn" onClick={handleNavigate}>
                                See Worker
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <form className="form-section" onSubmit={handleAddAddress}>
                            <input type="text" name="name" placeholder="Full Name" value={newAddress.name} onChange={handleChange} required />
                            <input type="text" name="phone" placeholder="Phone Number" value={newAddress.phone} onChange={handleChange} required />
                            <input type="text" name="street" placeholder="Street" value={newAddress.street} onChange={handleChange} required />
                            <div className="row">
                                <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleChange} required />
                                <input type="text" name="postOffice" placeholder="Post Office" value={newAddress.postOffice} onChange={handleChange} required />
                            </div>
                            <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleChange} required />
                            <input type="text" name="zip" placeholder="ZIP Code" value={newAddress.zip} onChange={handleChange} required />

                            <label className="save-address">
                                <input type="checkbox" name="save" checked={!!newAddress.save} onChange={handleChange} />
                                <p>I agree to the <span>Terms and conditions</span></p>
                            </label>

                            <div className="row">
                                <button type="submit" className="pay-btn">{editMode ? "💾 Update" : "✅ Save"}</button>
                                <button type="button" className="pay-btn" onClick={resetForm}>❌ Cancel</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddressManager;
