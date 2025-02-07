import axios from 'axios';

const BASE_URL = 'http://localhost:3310/api/product';

export const getProductById = async (product_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/detail`, {
            params: {
                product_id,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đã xảy ra lỗi.';
    }
};
