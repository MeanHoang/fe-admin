import axios from "axios";

const BASE_URL = "http://localhost:3310/api/attribute-option-sku/";

export const deleteAttributeOptionSku = async (skuId, attributeOptionId) => {
    try {
        const response = await axios.delete(`${BASE_URL}${skuId}/${attributeOptionId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting AttributeOptionSku:", error.response?.data || error.message);
        throw error;
    }
};
