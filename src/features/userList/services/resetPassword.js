import axios from "axios";

const BASE_URL = "http://localhost:3310/api/user";

export const resetPassword = async (id) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/reset-password`,
            { id }
        );
        console.log("check res: ", response);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message;

    }
}