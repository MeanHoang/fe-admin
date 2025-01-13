import React from "react";
import { useNavigate } from "react-router-dom";

import './AttributeRow.scss';
const AttributeRow = ({
    attribute, editingAttribute, setEditingAttribute,
    handleEditClickWrapper,
    handleSaveClickWrapper,
    handleDeleteClickWrapper,
}) => {
    const navigate = useNavigate();
    const gotoManageAttributeOption = (id) => {
        navigate(`/attribute/${id}`);
    };

    return (
        <tr key={attribute.id}>
            <td>{attribute.id}</td>

            <td>
                {editingAttribute?.id === attribute.id ? (
                    <input
                        type="text"
                        value={editingAttribute.name}
                        onChange={(e) => setEditingAttribute({ ...editingAttribute, name: e.target.value })}
                    />
                ) : (
                    attribute.name
                )}
            </td>

            <td>
                {editingAttribute?.id === attribute.id ? (
                    <input
                        type="text"
                        value={editingAttribute.slug}
                        onChange={(e) => setEditingAttribute({ ...editingAttribute, slug: e.target.value })}
                    />
                ) : (
                    attribute.slug
                )}
            </td>


            <td>
                {editingAttribute?.id === attribute.id ? (
                    <button className="save-button" onClick={() => handleSaveClickWrapper(attribute.id)}>Lưu</button>
                ) : (
                    <button className="update-button" onClick={() => handleEditClickWrapper(attribute)}>Cập nhập</button>
                )}

                <button className="delete-button" onClick={() => handleDeleteClickWrapper(attribute.id)}>Xóa</button>

                <button
                    className="detail-button"
                    onClick={() => gotoManageAttributeOption(attribute.id)}
                >
                    Chi tiết
                </button>

            </td>
        </tr>
    )
}

export default AttributeRow;