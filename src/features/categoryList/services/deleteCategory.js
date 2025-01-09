import axios from "axios";

const BASE_URL = 'http://localhost:3310/api/category';

export const deleteCategory = async (id) => {
    try {

        const token = localStorage.getItem('token');

        const response = await axios.delete(`${BASE_URL}/detail`,
            {
                data: { id },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

        console.log("check respone: ", response);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message;
    }
}