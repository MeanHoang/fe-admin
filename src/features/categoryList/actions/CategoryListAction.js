import { toast } from "react-toastify";

import { updateCategory } from "../services/updateCategory";
import { getAllCategory } from "../services/getAllCategory";
import { deleteCategory } from "../services/deleteCategory";

export const handleEditClick = (category, setEditingCategory) => {
    setEditingCategory(category);
};

export const handleSaveClick = async (id, editingCategory, currentPage,
    setCategories, setEditingCategory) => {
    try {
        const updateData = {
            id,
            name: editingCategory.name,
            description: editingCategory.description,
        }

        const result = await updateCategory(updateData);

        const data = await getAllCategory(currentPage);

        setCategories(data.categories);

        setEditingCategory(null);
        toast.success(result.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Cập nhật thất bại!");
    }
};

export const handleDeleteClick = async (id, currentPage, setCategories) => {
    try {
        const result = await deleteCategory(id);

        const data = await getAllCategory(currentPage);
        setCategories(data.categories);
        toast.success(result.message);
    } catch (error) {
        toast.error('Xóa thất bại!');
    }
}

export const handleToggleStatusClick = async (id, categorySatus,
    currentPage, setCategories) => {
    try {
        const updateData = {
            id,
            is_sale: !categorySatus,
        };
        const result = await updateCategory(updateData);

        const data = await getAllCategory(currentPage);

        setCategories(data.categories);

        toast.success(result.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Cập nhật thất bại!");
    }
};

