import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { createProduct } from "../services/createProduct";

import './AddProductForm.scss';

const AddProductForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category_id: "",
        name: "",
        desc: "",
        price: "",
        origin: "",
        material: "",
        is_sale: false,
    });
    const [image, setImage] = useState(null);


    // Xử lý thay đổi dữ liệu trong form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Xử lý khi chọn ảnh
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type;
            if (fileType !== "image/jpeg" && fileType !== "image/png"
                && fileType !== "image/jpg"
            ) {
                toast.error("Chỉ chấp nhận ảnh .jpg hoặc .png!");
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error("Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB!");
                return;
            }
            setImage(selectedFile);
        }
    };

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!image) {
                toast.error("Vui lòng chọn một ảnh!");
                return;
            }

            // Gửi dữ liệu đến API
            const response = await createProduct(formData, image);

            toast.success("Thêm sản phẩm thành công!");
            navigate("/products"); // Điều hướng về danh sách sản phẩm
        } catch (error) {
            console.error("Error in AddProductForm:", error);
            toast.error("Thêm sản phẩm thất bại. Vui lòng thử lại!");
        }
    };

    return (
        <div className="add-product-form">
            <h2>Thêm sản phẩm mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Danh mục sản phẩm:</label>
                    <input
                        type="text"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        placeholder="Nhập ID danh mục"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tên sản phẩm:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nhập tên sản phẩm"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mô tả:</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        placeholder="Nhập mô tả sản phẩm"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Giá sản phẩm:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Nhập giá sản phẩm"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Xuất xứ:</label>
                    <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        placeholder="Nhập xuất xứ sản phẩm"
                    />
                </div>
                <div className="form-group">
                    <label>Chất liệu:</label>
                    <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="Nhập chất liệu sản phẩm"
                    />
                </div>
                <div className="form-group">
                    <label>
                        Đang giảm giá:
                        <input
                            type="checkbox"
                            name="is_sale"
                            checked={formData.is_sale}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Hình ảnh sản phẩm:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Thêm sản phẩm
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddProductForm;
