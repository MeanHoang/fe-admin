import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:3310/api/sku';

export const deleteSku = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BASE_URL}/detail`, {
            data: { id },
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log("check response: ", response);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message;
    }
};
