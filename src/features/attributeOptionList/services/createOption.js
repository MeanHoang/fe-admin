import axios from 'axios';

const BASE_URL = 'http://localhost:3310/api/attribute-option';

export const createOption = async (data) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${BASE_URL}/create`,
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
