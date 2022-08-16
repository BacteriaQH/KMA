import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            code: 0,
            message: '',
        },
        logout: {
            isFetching: false,
            error: false,
            code: 0,
            message: '',
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.login.code = action.payload.code;
            state.login.message = action.payload.message;
        },
        loginFailure: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.code = action.payload.code;
            state.login.message = action.payload.message;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
            state.login.code = action.payload.code;
            state.login.message = action.payload.message;
        },
        logoutFailure: (state, action) => {
            state.logout.isFetching = false;
            state.logout.error = true;
            state.logout.code = action?.payload.code;
            state.logout.message = action?.payload.message;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logoutStart, logoutFailure, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
