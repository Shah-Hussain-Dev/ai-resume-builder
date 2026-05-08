import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: true,
    },
    reducers: {

        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
});

export const { login, logout, setUser, setToken, setLoading, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;