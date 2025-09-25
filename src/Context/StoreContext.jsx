import { createContext } from "react";

export const StoreContext = createContext();




export const StoreProvider = (props) => {
    // Backend URL
    const URL = "https://e-labour-backend.onrender.com/";
    const contextValue = {
        URL,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}