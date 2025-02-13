import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
    fetchCategories,
    handleChange,
    handleImageChange,
    handleSubmit
} from "../actions/AddProductFormAction";

import './AddProductForm.scss';

const AddProductForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category_id: "",
        name: "",
        desc: "",
        price: "",
        origin: "",
        material: ""
    });
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchCategories(setCategories);
    }, []);

    return (
        <div>
            <h2>Thêm sản phẩm mới</h2>
            <form onSubmit={(e) =>
                handleSubmit(e, formData, image, isSubmitting, setIsSubmitting, navigate)}>

                <div className="row-1">
                    <div className="form-group">
                        <label>Tên sản phẩm:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                            placeholder="Tên sản phẩm"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Gía tiền:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                            placeholder="Giá tiền"
                            required
                        />
                    </div>
                </div>

                <div className="row-2">
                    <div className="form-group">
                        <label>Danh mục sản phẩm:</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Mô tả:</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={(e) => handleChange(e, formData, setFormData)}
                        placeholder="Mô tả"
                    ></textarea>
                </div>

                <div className="row-3">
                    <div className="form-group">
                        <label>Xuất xứ:</label>
                        <input
                            type="text"
                            name="origin"
                            value={formData.origin}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                            placeholder="Xuất xứ"
                        />
                    </div>
                    <div className="form-group">
                        <label>Chất liệu:</label>
                        <input
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                            placeholder="Chất liệu"
                        />
                    </div>
                </div>

                <div className="row-4">
                    <div className="form-group">
                        <label>Hình ảnh sản phẩm:</label>
                        <input
                            type="file"
                            onChange={(e) => handleImageChange(e, setImage, setImagePreview)}
                            accept="image/*"
                            required
                        />
                    </div>
                    {imagePreview && (
                        <div className="image-preview">
                            <p>Ảnh xem trước:</p>
                            <img src={imagePreview} alt="Xem trước" />
                        </div>
                    )}
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Đang thêm..." : "Thêm sản phẩm"}
                </button>
            </form>

            <ToastContainer />
        </div>
    );
};

export default AddProductForm;
