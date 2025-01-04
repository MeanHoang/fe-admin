import axios from "axios";

const BASE_URL = "http://localhost:3310/api/admin";

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        return response.data; // Trả về dữ liệu gồm token hoặc thông tin đăng nhập
    } catch (error) {
        throw error.response?.data?.message || "Login failed"; // Xử lý lỗi
    }
};
