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


    // Worker Profile

    const [workerProfileData, setWorkerProfileData] = useState([]);
    console.log(workerProfileData);
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

        // Worker Profile
        workerProfileData,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}