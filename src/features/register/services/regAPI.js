import axios from "axios";

const BASE_URL = "http://localhost:3310/api/admin";

export const register = async (data) => {

    try {
        const response = await axios.post(`${BASE_URL}/register`, data);

        console.log("check credentials:", data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Register failed";
    }
}