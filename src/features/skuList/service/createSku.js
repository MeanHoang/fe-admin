import axios from 'axios';

const BASE_URL = 'http://localhost:3310/api/sku';

export const createSku = async (skuData) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, skuData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đã xảy ra lỗi khi tạo SKU.';
    }
};