import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { createCategory } from "../service/createCategory";

import './AddCategoryForm.scss';

const AddCategoryForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const dataCategory = {
                name, description
            }
            console.log("check dataCategory: ", dataCategory);
            const data = await createCategory(dataCategory);

            console.log("check res mes: ", data.message);
            toast.success("Tạo danh mục thành công!");
            navigate("/manage-category");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <label htmlFor="name">Tên danh mục</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Tên danh mục"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Mô tả"
                    />
                </div>

                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading} className="button-add">
                    {loading ? "Loading..." : "Thêm"}
                </button>
            </form>
        </div>
    );
};

export default AddCategoryForm;