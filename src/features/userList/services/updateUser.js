import axios from "axios";

const BASE_URL = "http://localhost:3310/api/user";

export const updateUser = async (userData) => {
    try {
        const response = await axios.put(`${BASE_URL}/profile`,
            userData
        );

        console.log("check res: ", response);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin người dùng.";
    }
}