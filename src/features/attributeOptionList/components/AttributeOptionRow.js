import React from "react";

const AttributeOptionRow = ({
    attributeOption, editingAttributeOption,
    setEditingAttributeOption,
    handleDeleteClickWrapper,
    handleEditClickWrapper,
    handleSaveClickWrapper,
}) => {
    return (
        <tr key={attributeOption.id}>
            <td>{attributeOption.id}</td>

            <td>
                {editingAttributeOption?.id === attributeOption.id ? (
                    <input
                        type="text"
                        value={editingAttributeOption.name}
                        onChange={(e) => setEditingAttributeOption({ ...editingAttributeOption, name: e.target.value })}
                    />
                ) : (
                    attributeOption.name
                )
                }
            </td>

            <td>
                {editingAttributeOption?.id === attributeOption.id ? (
                    <input
                        type="text"
                        value={editingAttributeOption.value}
                        onChange={(e) => setEditingAttributeOption({ ...editingAttributeOption, value: e.target.value })}
                    />
                ) : (
                    attributeOption.value
                )
                }
            </td>

            <td>
                {editingAttributeOption?.id === attributeOption.id ? (
                    <button className="save-button" onClick={() => handleSaveClickWrapper(attributeOption.id)}>Lưu</button>
                ) : (
                    <button className="update-button" onClick={() => handleEditClickWrapper(attributeOption)}>Cập nhập</button>
                )}

                <button className="delete-button" onClick={() => handleDeleteClickWrapper(attributeOption.id)}>Xóa</button>

            </td>
        </tr>
    );
}

export default AttributeOptionRow;