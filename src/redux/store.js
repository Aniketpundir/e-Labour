import { configureStore } from "@reduxjs/toolkit";
import UserAuthReducer from "./slices/CustomerAuthSlice.js";
import WorkersAuthReducer from "./slices/WorkersAuthSlice.js";

const store = configureStore({
    reducer: {
        UserAuth: UserAuthReducer,
        workersAuth: WorkersAuthReducer,
    },
});

export default store;
