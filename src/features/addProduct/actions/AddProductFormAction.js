import { toast } from "react-toastify";

import { createProduct } from "../services/createProduct";
import { getAllCategory } from "../../categoryList/services/getAllCategory";

// Lấy danh mục sản phẩm
export const fetchCategories = async (setCategories) => {
    try {
        const data = await getAllCategory();
        setCategories(data.categories);
    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
    }
};

// Xử lý thay đổi form
export const handleChange = (e, formData, setFormData) => {
    const { name, value, type, checked } = e.target;
    setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
    });
};

// Xử lý ảnh
export const handleImageChange = (e, setImage, setImagePreview) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const fileType = selectedFile.type;
        if (!["image/jpeg", "image/png", "image/jpg"].includes(fileType)) {
            toast.error("Chỉ chấp nhận ảnh .jpg hoặc .png!");
            return;
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
            toast.error("Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB!");
            return;
        }
        setImage(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
    }
};

// Xử lý submit form
export const handleSubmit = async (e, formData, image, isSubmitting, setIsSubmitting, navigate) => {
    e.preventDefault();
    console.log("Submit form");

    if (!image) {
        toast.error("Vui lòng chọn một ảnh!");
        return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
        const respone = await createProduct(formData, image);
        toast.success(respone.message);
        navigate("/manage-product");
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        toast.error("Thêm sản phẩm thất bại. Vui lòng thử lại!");
    } finally {
        setIsSubmitting(false);
    }
};