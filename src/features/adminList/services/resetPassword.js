import axios from "axios";

const BASE_URL = "http://localhost:3310/api/admin";

export const resetPassword = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            `${BASE_URL}/reset-password`,
            { id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("Check res: ", response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin Admin.";
    }
};
