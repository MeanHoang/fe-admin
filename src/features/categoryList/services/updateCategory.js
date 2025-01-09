import axios from "axios";

const BASE_URL = 'http://localhost:3310/api/category';

export const updateCategory = async (data) => {
    try {

        const token = localStorage.getItem('token');

        const response = await axios.put(`${BASE_URL}/detail`, data,
            {
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