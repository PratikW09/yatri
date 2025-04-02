import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Login API (No changes)
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
  console.log(response.data)
  return response.data;
};

// Signup API (No changes)
export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData, { withCredentials: true });
  
  return response.data;
};

// Send OTP (No changes)
export const sendOtp = async (email) => {
  const response = await axios.post(`${API_URL}/auth/otp/send`, { email }, { withCredentials: true });
  return response.data;
};

// Verify OTP (No changes)
export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${API_URL}/auth/otp/verify`, { email, otp }, { withCredentials: true });
  return response.data;
};

// 🔥 Modified getUserProfile with Token in Headers
export const getUserProfile = async () => {
  const token = localStorage.getItem("token"); // Retrieve token from storage
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}` // Send token in header
    }
  });
  return response.data;
};

// 🔥 Modified fetchUsers with Token in Headers
export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token"); 
    // Retrieve token from storage
    console.log("in fetch",token);
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}` // Send token in header
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error.response?.data || { message: "Server error" };
  }
};
