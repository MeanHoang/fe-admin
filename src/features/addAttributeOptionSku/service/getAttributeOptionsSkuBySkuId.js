import axios from "axios";

const BASE_URL = "http://localhost:3310/api/attribute-option-sku/";

export const getAttributeOptionsSkuBySkuId = async (skuId) => {
    try {
        const response = await axios.get(`${BASE_URL}${skuId}`);

        console.log("check respone attribute-option-sku: ", response);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách attribute options:", error.response?.data || error.message);
        throw error;
    }
};
