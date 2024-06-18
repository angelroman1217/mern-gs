import axios from "./axios";

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = (token) => axios.post(`/verify`, token);

export const registerRequest = (user) => axios.post(`/register`, user);

export const logoutRequest = (token) => axios.post(`/logout`, token);