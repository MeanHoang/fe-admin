import axios from 'axios';

const BASE_URL = 'http://localhost:3310/api/attribute';

export const updateAttribute = async (data) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(`${BASE_URL}/detail`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || '';
    }
};
