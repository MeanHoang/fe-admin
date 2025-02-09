import axios from "axios";

const BASE_URL = 'http://localhost:3310/api/product';

export const getAllProduct = async (page = 1, limit = 7, searchTerm = ' ') => {
    try {
        const response = await axios.get(`${BASE_URL}/`, {
            params: { page, limit, searchTerm }
        });

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || '';
    }
};
