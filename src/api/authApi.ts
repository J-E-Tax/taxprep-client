import apiClient from './index';

interface credentials {
    email: string;
    password: string;
}

export const login = (loginCredentials: credentials) => {
    return apiClient.post('/login', loginCredentials);
}

export const signUp = (signUpCredentials: credentials) => {
    return apiClient.post('/users/register', signUpCredentials);
}

export const logoutUser = () => {
    return apiClient.get('/logout', { withCredentials: true });
}