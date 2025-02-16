import { toast } from "react-toastify";
import { createSku } from "../services/createSku";

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
export const handleSubmit = async (e, formData, image, isSubmitting, setIsSubmitting, setFormData, setImage, setImagePreview, navigate) => {
    e.preventDefault();
    console.log("Submit form");

    if (!image) {
        toast.error("Vui lòng chọn một ảnh!");
        return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
        const response = await createSku(formData, image);
        toast.success(response.message);

        // Reset form sau khi submit thành công
        setFormData({ price: "" });
        setImage(null);
        setImagePreview(null);
        navigate(`/product/${formData.product_id}`);
    } catch (error) {
        console.error("Lỗi khi thêm SKU", error);
        toast.error("Thêm SKU thất bại. Vui lòng thử lại!");
    } finally {
        setIsSubmitting(false);
    }
};

// Hủy form
export const handleReset = (setFormData, setImage, setImagePreview) => {
    setFormData({
        product_id: "",
        price: ""
    });
    setImage(null);
    setImagePreview(null);
};
