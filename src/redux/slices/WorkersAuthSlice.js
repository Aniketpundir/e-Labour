// redux/slices/WorkersAuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Signup worker
export const signupWorker = createAsyncThunk(
    "workers/signup",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/api/workers/signup", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (!response.ok) return rejectWithValue(result.message || "Signup failed");
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Login worker
export const loginWorker = createAsyncThunk(
    "workers/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/api/workers/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            const result = await response.json();
            if (!response.ok) return rejectWithValue(result.message || "Login failed");
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    worker: null,
    token: null,
    loading: false,
    error: null,
};

const WorkersAuthSlice = createSlice({
    name: "workersAuth",
    initialState,
    reducers: {
        logout: (state) => {
            state.worker = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signupWorker.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(signupWorker.fulfilled, (state, action) => {
                state.loading = false;
                state.worker = action.payload.worker;
                state.token = action.payload.token;
            })
            .addCase(signupWorker.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // Login
            .addCase(loginWorker.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginWorker.fulfilled, (state, action) => {
                state.loading = false;
                state.worker = action.payload.worker;
                state.token = action.payload.token;
            })
            .addCase(loginWorker.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    },
});

export const { logout } = WorkersAuthSlice.actions;
export default WorkersAuthSlice.reducer;
