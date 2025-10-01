import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const StoreContext = createContext();




export const StoreProvider = (props) => {
    // Backend URL
    const URL_LINK = "https://e-labour-backend.onrender.com/";
    // const URL_LINK = "http://localhost:5000/";

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
        if (!customerToken) return; // wait until token is loaded

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

            // Fix here
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
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lati, setLati] = useState("");
    const [longi, setLongi] = useState("");

    const address = `${city}, ${state}`;
    // console.log(address)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    setLati(latitude);
                    setLongi(longitude);

                    dist(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }

        const dist = async (latitude, longitude) => {
            try {
                // ----OpenCage API(for district, state, etc.)
                let apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
                let apikey = "416911d3a90940a6ba7ba4f7aaaa402e";

                const query = `${latitude},${longitude}`;
                const apiUrl = `${apiEndPoint}?key=${apikey}&q=${query}&pretty=1`;

                const res = await axios(apiUrl);
                const data = res.data;
                const districtName = data.results[0].components.state_district;
                const cityName = data.results[0].components.city;
                const stateName = data.results[0].components.state;

                setDistrict(districtName);
                setCity(cityName);
                setState(stateName);
                // console.log(res)
                // console.log(stateName);



                // const pincode = data.results[0].components.postcode;

                // const response = await axios.get(`https://api.postalpincode.in/pincode/251002`)

                // console.log(response);

            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        // dist();
    }, [setDistrict]);


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
        address,
        state,
        city,
        lati,
        longi,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}