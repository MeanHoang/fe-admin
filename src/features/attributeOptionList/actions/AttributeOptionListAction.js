import { toast } from "react-toastify";

import { getOptionByAttributeId } from "../services/getOptionByAttributeId";
import { updateOption } from "../services/updateOption";
import { deleteOption } from "../services/deleteOption";

export const handleEditClick = (atrributeOption,
    setEditingAtrributeOption) => {
    setEditingAtrributeOption(atrributeOption);
};

export const handleSaveClick = async (id, editingAtrributeOption,
    setAttributeOptions, setEditingAtrributeOption, attribute_id) => {
    try {
        const updateData = {
            id,
            name: editingAtrributeOption.name,
            value: editingAtrributeOption.value,
        }

        const result = await updateOption(updateData);

        const data = await getOptionByAttributeId(attribute_id);

        console.log("check data: ", data);
        setAttributeOptions(data.attributeOptions);

        setEditingAtrributeOption(null);

        toast.success(result.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Cập nhật thất bại!");
    }
};

export const handleDeleteClick = async (id, setAttributeOptions, attribute_id) => {
    try {
        const result = await deleteOption(id);

        const data = await getOptionByAttributeId(attribute_id);
        setAttributeOptions(data.attributeOptions);
        toast.success(result.message);
    } catch (error) {
        toast.error('Xóa thất bại!');
    }
}