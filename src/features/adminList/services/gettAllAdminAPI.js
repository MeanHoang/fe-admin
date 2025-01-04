import axios from "axios";

const BASE_URL = "http://localhost:3310/api/admin";

export const getAllAdmin = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}` // Thêm token vào header
            }
        });
        return response.data.admins;
    } catch (error) {
        throw error.response?.data?.message || ""; // Xử lý lỗi
    }
}