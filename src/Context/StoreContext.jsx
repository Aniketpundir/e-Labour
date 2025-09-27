import { createContext } from "react";

export const StoreContext = createContext();




export const StoreProvider = (props) => {
    // Backend URL
    const URL_LINK = "https://e-labour-backend.onrender.com/";
    // const URL_LINK = "http://localhost:5000/";
    const contextValue = {
        URL_LINK,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}