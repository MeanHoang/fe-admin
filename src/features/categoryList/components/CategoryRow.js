import React from "react";

const CategoryRow = ({
    category, editingCatgory, setEditingCategory,
    handleDeleteClickWrapper,
    handleEditClickWrapper,
    handleSaveClickWrapper,
    handleToggleStatusClickWrapper
}) => {
    return (
        <tr key={category.id}>
            <td>{category.id}</td>

            {/*Name*/}
            <td>
                {editingCatgory?.id === category.id ? (
                    <input
                        type="text"
                        value={editingCatgory.name}
                        onChange={(e) => setEditingCategory({ ...editingCatgory, name: e.target.value })}
                    />
                ) : (
                    category.name
                )}
            </td>

            {/*Des*/}
            <td>
                {editingCatgory?.id === category.id ? (
                    <input
                        type="text"
                        value={editingCatgory.description}
                        onChange={(e) => setEditingCategory({ ...editingCatgory, description: e.target.value })}
                    />
                ) : (
                    category.description
                )}
            </td>

            {/* ToggleSwitch */}
            <td>
                <div
                    className={`toggle-switch ${category.is_sale ? "active" : ""}`}
                    onClick={() =>
                        handleToggleStatusClickWrapper(category.id, category.is_sale)
                    }
                >
                    <div className="switch"></div>
                </div>
            </td>

            <td>
                {editingCatgory?.id === category.id ? (
                    <button className="save-button" onClick={() => handleSaveClickWrapper(category.id)}>Lưu</button>
                ) : (
                    <button className="update-button" onClick={() => handleEditClickWrapper(category)}>Cập nhập</button>
                )}

                <button className="delete-button" onClick={() => handleDeleteClickWrapper(category.id)}>Xóa</button>

            </td>
        </tr>
    )
}

export default CategoryRow;