import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

export const StoreProvider = (props) => {
    // Backend URL
    const URL_LINK = "https://e-labour-backend.onrender.com/";

    // ================== TOKENS ==================
    const [workerToken, setWorkerToken] = useState(localStorage.getItem("workerToken") || null);
    const [customerToken, setCustomerToken] = useState(localStorage.getItem("customerToken") || null);

    // Save tokens to localStorage automatically
    useEffect(() => {
        if (workerToken) {
            localStorage.setItem("workerToken", workerToken);
        } else {
            localStorage.removeItem("workerToken");
        }
    }, [workerToken]);

    useEffect(() => {
        if (customerToken) {
            localStorage.setItem("customerToken", customerToken);
        } else {
            localStorage.removeItem("customerToken");
        }
    }, [customerToken]);

    // ================== CUSTOMER PROFILE ==================
    const [customerProfileData, setCustomerProfileData] = useState(null);

    useEffect(() => {
        if (!customerToken) return;
        const fetchCustomerProfile = async () => {
            try {
                const res = await axios.get(`${URL_LINK}api/users/mydetails`, {
                    headers: { token: customerToken },
                });
                setCustomerProfileData(res.data);
            } catch (error) {
                console.error("Error fetching customer profile:", error.response?.data || error.message);
            }
        };
        fetchCustomerProfile();
    }, [customerToken]);

    // ================== ADDRESSES ==================
    const [addresses, setAddresses] = useState([]);
    const [loadingAddr, setLoadingAddr] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const fetchAddresses = async () => {
        if (!customerToken) return;
        try {
            setLoadingAddr(true);
            const res = await axios.get(`${URL_LINK}api/addresses/user`, {
                headers: { token: customerToken },
            });
            const addrList = res.data?.addresses || res.data?.data || [];
            setAddresses(addrList);
            if (addrList.length > 0) {
                setSelectedAddress(addrList[0]._id);
            }
        } catch (err) {
            console.error("Error fetching addresses:", err.response?.data || err.message);
        } finally {
            setLoadingAddr(false);
        }
    };

    useEffect(() => {
        if (customerToken) {
            fetchAddresses();
        }
    }, [customerToken]);

    // ================== WORKER PROFILE ==================
    const [workerProfileData, setWorkerProfileData] = useState(null);

    useEffect(() => {
        if (!workerToken) return;
        const fetchWorkerProfile = async () => {
            try {
                const res = await axios.get(`${URL_LINK}api/workers/mydetails`, {
                    headers: { token: workerToken },
                });
                setWorkerProfileData(res.data.worker);
            } catch (error) {
                console.error("Error fetching worker profile:", error.response?.data || error.message);
            }
        };
        fetchWorkerProfile();
    }, [workerToken]);

    // ================== LOCATION (DISTRICT, CITY, STATE) ==================
    const [district, setDistrict] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lati, setLati] = useState("");
    const [longi, setLongi] = useState("");

    useEffect(() => {
        const fetchLocationDetails = async (latitude, longitude) => {
            try {
                const apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
                const apikey = "416911d3a90940a6ba7ba4f7aaaa402e";
                const query = `${latitude},${longitude}`;
                const apiUrl = `${apiEndPoint}?key=${apikey}&q=${query}&pretty=1`;

                const res = await axios(apiUrl);
                const data = res.data.results[0]?.components || {};

                setDistrict(data.state_district || "");
                setCity(data.city || data.town || data.village || "");
                setState(data.state || "");
                setPinCode(data.postcode || "");
            } catch (error) {
                console.error("Error fetching location data:", error.message);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLati(latitude);
                    setLongi(longitude);
                    fetchLocationDetails(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error.message);
                }
            );
        }
    }, []);

    // ================== BOOKINGS ==================
    const [bookingWorkerList, setBookingWorkerList] = useState([]);
    const [pastBookingWorkerList, setPastBookingWorkerList] = useState([]);
    const [jobRequest, setJobRequest] = useState([]);

    const bookingWorkersList = async () => {
        if (!customerToken) return;
        try {
            const res = await axios.get(`${URL_LINK}api/bookings/`, {
                headers: { token: customerToken },
                params: { q: "upcoming" },
            });
            setBookingWorkerList(res.data.bookings || []);
        } catch (error) {
            console.error("Error fetching upcoming bookings:", error.response?.data || error.message);
        }
    };

    const pastBookingWorkersList = async () => {
        if (!customerToken) return;
        try {
            const res = await axios.get(`${URL_LINK}api/bookings/`, {
                headers: { token: customerToken },
                params: { q: "completed" },
            });
            setPastBookingWorkerList(res.data.bookings || []);
        } catch (error) {
            console.error("Error fetching past bookings:", error.response?.data || error.message);
        }
    };

    const jobRequestForWorker = async () => {
        if (!workerToken) return;
        try {
            const res = await axios.get(`${URL_LINK}api/bookings/`, {
                headers: { token: workerToken },
                params: { q: "pending" },
            });
            setJobRequest(res.data.bookings || []);
        } catch (error) {
            console.error("Error fetching job requests:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (customerToken) {
            bookingWorkersList();
            pastBookingWorkersList();
        }
    }, [customerToken]);

    useEffect(() => {
        if (workerToken) {
            jobRequestForWorker();
        }
    }, [workerToken]);

    // ================== CONTEXT VALUE ==================
    const contextValue = {
        URL_LINK,

        // Tokens
        workerToken,
        setWorkerToken,
        customerToken,
        setCustomerToken,

        // Profiles
        customerProfileData,
        workerProfileData,

        // Addresses
        addresses,
        loadingAddr,
        selectedAddress,
        setSelectedAddress,
        fetchAddresses,

        // Location
        district,
        state,
        city,
        pinCode,
        lati,
        longi,

        // Bookings
        bookingWorkerList,
        pastBookingWorkerList,
        jobRequest,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
