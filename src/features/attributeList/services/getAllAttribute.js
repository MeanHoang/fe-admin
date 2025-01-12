import axios from 'axios';

const BASE_URL = 'http://localhost:3310/api/attribute';

export const getAllAttribute = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${BASE_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || '';
    }
};
