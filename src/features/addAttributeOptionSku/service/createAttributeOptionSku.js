import axios from "axios";

const BASE_URL = "http://localhost:3310/api/attribute-option-sku/create";

export const createAttributeOptionSku = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data);
        console.log("check res: ", response);
        return response.data;
    } catch (error) {
        console.error("Error creating AttributeOptionSku:", error.response?.data || error.message);
        throw error;
    }
};
