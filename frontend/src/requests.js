import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const createAccount = async function (userData) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);

    if (response.status >= 200 && response.status < 300) {
      if (response.data.success) {
        console.log("Account created successfully:", response.data);
      } else {
        throw new Error("Could not register - Backend indicated failure.");
      }
    } else {
      throw new Error("Could not register - HTTP status is not successful.");
    }

    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error creating account:", error.response.data);
    } else {
      console.error("Error creating account:", error.message);
    }
  }
};
