import axios from "axios";

const BASE_URL = "http://localhost:3310/api/product";

export const updateProduct = async (updatedProductData, imageFile) => {
    try {
        const formData = new FormData();

        formData.append('id', updatedProductData.id || "");
        formData.append('name', updatedProductData.name || "");
        formData.append('desc', updatedProductData.desc || "");
        formData.append('price', updatedProductData.price || "");
        formData.append('origin', updatedProductData.origin || "");
        formData.append('material', updatedProductData.material || "");
        formData.append('category_id', updatedProductData.category_id || "");

        // Kiểm tra nếu có ảnh mới thì mới thêm vào formData
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const token = localStorage.getItem("token");

        console.log("check updatedProductData: ", updatedProductData);

        const response = await axios.put(
            `${BASE_URL}/detail`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Lỗi khi cập nhật sản phẩm.";
    }
};
