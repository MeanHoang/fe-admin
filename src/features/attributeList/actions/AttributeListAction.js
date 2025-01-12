import { toast } from "react-toastify";

import { updateAttribute } from "../services/updateAttribute";
import { getAllAttribute } from "../services/getAllAttribute";
import { deleteAttribute } from "../services/deleteAttribute";

export const handleEditClick = (attribute, setEdittingAttribute) => {
    setEdittingAttribute(attribute);
};

export const handleSaveClick = async (id, editingAttribute,
    setAttributes, setEdittingAttribute) => {
    try {
        const updateData = {
            id,
            name: editingAttribute.name,
            slug: editingAttribute.slug,
        }

        const result = await updateAttribute(updateData);

        const data = await getAllAttribute();

        setAttributes(data.attributes);

        setEdittingAttribute(null);

        toast.success(result.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Cập nhật thất bại!");
    }
};

export const handleDeleteClick = async (id, setAttributes) => {
    try {
        const result = await deleteAttribute(id);

        const data = await getAllAttribute();
        setAttributes(data.attributes);
        toast.success(result.message);
    } catch (error) {
        toast.error('Xóa thất bại!');
    }
};

