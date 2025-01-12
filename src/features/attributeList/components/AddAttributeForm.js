import React, { useState } from "react";
import { toast } from "react-toastify";
import './AddAttributeForm.scss';

const AddAttributeForm = ({ onAddAttribute }) => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddAttribute = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu nhập vào
        if (!formData.name.trim() || !formData.slug.trim()) {
            toast.error("Cả tên và slug đều không được để trống!");
            return;
        }

        try {
            // Gửi thuộc tính mới lên cha thông qua hàm onAddAttribute
            await onAddAttribute(formData);
            setFormData({ name: "", slug: "" });
            toast.success("Thêm danh mục mới thành công!");
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm danh mục.");
        }
    };

    return (
        <form onSubmit={handleAddAttribute} className="add-attribute-form">
            <div className="form-group">
                <label htmlFor="name">Tên danh mục</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập tên danh mục"
                />
            </div>
            <div className="form-group">
                <label htmlFor="slug">Ghi chú</label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="Ghi chú"
                />
            </div>
            <button className="button-add" type="submit">Thêm</button>
        </form>
    );
};

export default AddAttributeForm;
