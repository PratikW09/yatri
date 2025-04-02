import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData, { withCredentials: true });
  return response.data;
};

export const sendOtp = async (email) => {
  const response = await axios.post(`${API_URL}/auth/otp/send`, { email }, { withCredentials: true });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${API_URL}/auth/otp/verify`, { email, otp }, { withCredentials: true });
  return response.data;
};

export const getUserProfile = async()=>{
  const response = await axios.get(`${API_URL}/users/me`,{ withCredentials: true });
  return response.data;
}

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error.response?.data || { message: "Server error" };
  }
};