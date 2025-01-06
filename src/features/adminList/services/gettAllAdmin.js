import axios from 'axios';

const BASE_URL = 'http://localhost:3310/api/admin';

export const getAllAdmin = async (page = 1, limit = 7, searchTerm = '') => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/`, {
            params: { page, limit, searchTerm }, // Sử dụng params
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || '';
    }
};
