import axios from "axios";

const BASE_URL = "http://localhost:3310/api/admin";

export const register = async (credentials) => {

    try {
        const response = await axios.post(`${BASE_URL}/register`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Register failed";
    }
}