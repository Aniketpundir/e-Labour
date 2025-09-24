import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios"; // 👈 Import Axios

// 🔴 Async thunk for signup (using Axios)
export const signupUser = createAsyncThunk(
    "UserAuth/signupUser",
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/customer/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // 👈 for FormData
                    },
                }
            );

            // Axios stores JSON directly in response.data
            const data = response.data;

            // Save token in cookies
            Cookies.set("token", data.token);

            return data; // Pass API response to reducer
        } catch (error) {
            // Handle server or network error
            const message =
                error.response?.data?.message || error.message || "Signup failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 🔵 Async thunk for login (using Axios)
export const loginUser = createAsyncThunk(
    "UserAuth/loginUser",
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/customer/login",
                credentials
            );

            const data = response.data;

            // Save token in cookies
            Cookies.set("token", data.token);

            return data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Login failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 🧠 Slice stays the same
const UserAuthSlice = createSlice({
    name: "UserAuth",
    initialState: {
        user: null,
        token: Cookies.get("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // SIGNUP
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = UserAuthSlice.actions;
export default UserAuthSlice.reducer;
