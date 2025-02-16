import axios from 'axios';

const BASE_URL = 'http://localhost:3310/api/sku';

export const getSkuByProductId = async (product_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/sku-product`, {
            params: {
                product_id,
            },
        });

        console.log("check res: ", response);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đã xảy ra lỗi.';
    }
};
