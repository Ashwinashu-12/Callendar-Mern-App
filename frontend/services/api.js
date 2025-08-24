import axios from "axios";

// Backend API base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend URL differs
});

// Auth APIs
export const signupUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await API.post("/auth/login", userData);
    return res.data;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};

// You can add more APIs later, e.g., getEvents, createEvent, etc.
