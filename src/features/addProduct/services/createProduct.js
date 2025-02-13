import axios from "axios";

const BASE_URL = 'http://localhost:3310/api/product/create';

export const createProduct = async (data, imageFile) => {
    try {
        const formData = new FormData();

        formData.append('name', data.name || null);
        formData.append('desc', data.desc || null);
        formData.append('price', data.price || null);
        formData.append('origin', data.origin || null);
        formData.append('material', data.material || null);
        formData.append('category_id', data.category_id ? data.category_id : null);
        formData.append('image', imageFile);

        const token = localStorage.getItem("token");

        // Log formData để kiểm tra xem dữ liệu có đầy đủ chưa
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await axios.post(BASE_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Backend error:", error.response.data);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Request error:", error.message);
        }
        throw error;
    }
};
