import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: null | string;
    userId: number
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
    userId: 0,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            const decoded: any = jwtDecode(action.payload);
            console.log(decoded);
            state.userId = Number(decoded.userId); // this is the cuurent userId from the token
            state.token = action.payload; // this payload is JWT token
            state.loading = false;
            // localStorage.setItem('token', action.payload);
            // cookies.set('token', action.payload, { path: '/', maxAge: 86400 });// set the token in the cookie 86400 = 1 DAY
        },
        loginFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            // localStorage.removeItem('token');
            cookies.remove('token', { path: '/' }); // Remove the token cookie
        },
        initializeAuth: (state) => {
            // const token = getCookie('token');
            const token = cookies.get('token');
            if (token) {
                const decoded: any = jwtDecode(token);
                state.isAuthenticated = true;
                state.userId = Number(decoded.userId);
                state.token = token;
            }
        }
    },
});

export const { loginStart, loginSuccess, loginFail, logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
