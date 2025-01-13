import axios from 'axios';

const BASE_URL = 'http://localhost:3310/api/attribute-option';

export const getOptionByAttributeId = async (attribute_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-by-attributeId`, {
            params: {
                attribute_id,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đã xảy ra lỗi.';
    }
};
