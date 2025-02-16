import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
    handleReset,
    handleChange,
    handleImageChange,
    handleSubmit
} from "../actions/AddSkuFormAction";

import './AddSkuForm.scss';

const AddSkuForm = ({ productId }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        product_id: productId || "",
        price: ""
    });

    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            product_id: productId
        }));
    }, [productId]);

    return (
        <div>
            <form onSubmit={(e) =>
                handleSubmit(e, formData, image, isSubmitting,
                    setIsSubmitting, setFormData, setImage,
                    setImagePreview, navigate)}
            >


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

                <button type="submit" className="submit-btn"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Đang thêm..." : "Thêm"}
                </button>

                <button type="button" onClick={() =>
                    handleReset(setFormData, setImage, setImagePreview)}>
                    Hủy
                </button>

            </form >

            <ToastContainer />
        </div >
    );
};

export default AddSkuForm;
