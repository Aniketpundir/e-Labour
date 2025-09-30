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
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}