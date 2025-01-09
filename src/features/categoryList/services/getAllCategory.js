import axios from "axios";

const BASE_URL = 'http://localhost:3310/api/category';

export const getAllCategory = async (page = 1,
    limit = 7, searchTerm = '') => {
    try {

        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/`,
            {
                params: { page, limit, searchTerm },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || '';
    }
} 