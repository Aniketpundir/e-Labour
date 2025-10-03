import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import { header } from "framer-motion/m";

export const StoreContext = createContext();




export const StoreProvider = (props) => {
    // Backend URL
    const URL_LINK = "https://e-labour-backend.onrender.com/";

    const [workerToken, setWorkerToken] = useState(null);
    const [customerToken, setCustomerToken] = useState(null);

    useEffect(() => {
        const worker = localStorage.getItem("workerToken");
        const customer = localStorage.getItem("customerToken");

        setWorkerToken(worker);
        setCustomerToken(customer);
    }, []);


    // Customer Profile

    const [customerProfileData, setCustomerProfileData] = useState([]);

    useEffect(() => {
        if (!customerToken) return;

        const customerProfile = async () => {
            try {
                const res = await axios.get(URL_LINK + "api/users/mydetails", {
                    headers: { token: customerToken }
                });
                setCustomerProfileData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        customerProfile();
    }, [customerToken]);

    // Fetch worker for customer showing
    const [addresses, setAddresses] = useState([]);
    const [loadingAddr, setLoadingAddr] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);



    const fetchAddresses = async () => {
        try {
            let newUrl = `${URL_LINK}api/addresses/user`;
            setLoadingAddr(true);

            const res = await axios.get(newUrl, {
                headers: { token: customerToken }
            });

            setAddresses(res.data?.addresses);

            const addresses = res.data?.data || res.data;

            if (Array.isArray(addresses)) {
                setAddresses(addresses);
                if (addresses.length > 0) {
                    setSelectedAddress(addresses[0]._id);
                }
            }
        } catch (err) {
            console.error("Error fetching addresses:", err);
        } finally {
            setLoadingAddr(false);
        }
    };


    useEffect(() => {
        if (!customerToken) return;
        fetchAddresses();
    }, [customerToken])

    // Worker Profile

    const [workerProfileData, setWorkerProfileData] = useState([]);
    useEffect(() => {
        if (!workerToken) return;
        const workerProfile = async () => {
            try {
                const res = await axios.get(URL_LINK + "api/workers/mydetails", { headers: { token: workerToken } })
                setWorkerProfileData(res.data.worker);
            } catch (error) {

            }
        }

        workerProfile();
    }, [workerToken])

    /////////////////
    const [district, setDistrict] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lati, setLati] = useState("");
    const [longi, setLongi] = useState("");

    useEffect(() => {
        const dist = async (latitude, longitude) => {
            try {
                let apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
                let apikey = "416911d3a90940a6ba7ba4f7aaaa402e";
                const query = `${latitude},${longitude}`;
                const apiUrl = `${apiEndPoint}?key=${apikey}&q=${query}&pretty=1`;

                const res = await axios(apiUrl);
                const data = res.data;

                const districtName = data.results[0].components.state_district;
                const cityName = data.results[0].components.city;
                const stateName = data.results[0].components.state;
                const postCode = data.results[0].components.postcode;

                setDistrict(districtName);
                setCity(cityName);
                setState(stateName);
                setPinCode(postCode);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    setLati(latitude);
                    setLongi(longitude);

                    dist(latitude, longitude); // ✅ Now this works correctly
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);


    //////////////////// This function is for worker details //////////////

    const { id } = useParams();
    const workerId = id;
    const [workerDetails, setWorkerDetails] = useState([]);

    useEffect(() => {
        const workerDetails = async () => {
            try {
                const res = await axios.get(`${URL_LINK}api/workers/${workerId}`);
                setWorkerDetails(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (workerId) {   // ✅ Only call if id is available
            workerDetails();
        }
    }, [workerId]);

    //////// Customer Booking section ///////////

    const [bookingWorkerList, setBookingWorkerList] = useState([]);

    const bookingWorkersList = async () => {
        try {
            let newUrl = URL_LINK;
            newUrl += "api/bookings/";

            const res = await axios.get(
                newUrl,
                {
                    headers: { token: customerToken },
                    params: { status: "pending" },
                }
            );
            setBookingWorkerList(res.data.bookings);
        } catch (error) {
            console.log("not fetched!");
        }
    }

    useEffect(() => {
        if (!customerToken) { return; }
        bookingWorkersList();
    }, [customerToken])


    // console.log(workerDetails)
    const contextValue = {
        URL_LINK,

        // Tokens for auth
        workerToken,
        setCustomerToken,
        customerToken,
        setWorkerToken,

        // Customer Profile
        customerProfileData,

        addresses,
        loadingAddr,
        selectedAddress,
        setSelectedAddress,
        fetchAddresses,

        // Worker Profile
        workerProfileData,

        // Location
        district,
        state,
        city,
        pinCode,
        lati,
        longi,

        //worker details for showing people
        workerDetails,
        bookingWorkerList,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}