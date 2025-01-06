import axios from "axios";

const BASE_URL = "http://localhost:3310/api/admin";

export const deleteAdmin = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/profile`,
            {
                data: { id },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        return response.data;

    } catch (error) {
        throw error.response?.data?.message || "Có lỗi xảy ra khi xóa admin.";
    }
}
