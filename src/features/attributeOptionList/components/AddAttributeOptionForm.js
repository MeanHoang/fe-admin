import React, { useState } from "react";
import { toast } from "react-toastify";
import { Value } from "sass";

const AddAttributeOptionForm = ({ onAddAttributeOption, attribute_id }) => {
    const [formData, setFormData] = useState({
        name: "",
        value: "",
        attribute_id,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddAttributeOption = async (e) => {
        e.preventDefault();

        try {
            // Gửi thuộc tính mới lên cha thông qua hàm onAddAttribute
            await onAddAttributeOption(formData);
            setFormData({ name: "", value: "", attribute_id });
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm danh mục.");
        }
    };

    return (
        <form onSubmit={handleAddAttributeOption} className="add-attribute-form">

            <div className="form-group">
                <label htmlFor="name">Tên biến</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập tên biến"
                />
            </div>
            <div className="form-group">
                <label htmlFor="slug">Gía trị</label>
                <input
                    type="text"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    placeholder="Gía trị"
                />
            </div>
            <button className="button-add" type="submit">Thêm</button>
        </form>
    );
};

export default AddAttributeOptionForm;