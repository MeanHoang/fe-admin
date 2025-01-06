import React from 'react';

const AdminRow = ({ admin, editingAdmin, setEditingAdmin,
    handleEditClickWrapper,
    handleSaveClickWrapper,
    handleDeleteClickWrapper,
    handleToggleStatusClickWrapper,
    handleResetPassClickWrapper }) => {
    return (
        <tr key={admin.id}>
            <td>{admin.id}</td>

            {/* Username */}
            <td>
                {editingAdmin?.id === admin.id ? (
                    <input
                        type="text"
                        value={editingAdmin.username}
                        onChange={(e) => setEditingAdmin({ ...editingAdmin, username: e.target.value })}
                    />
                ) : (
                    admin.username
                )}
            </td>

            {/* Password */}
            <td>
                {editingAdmin?.id === admin.id ? (
                    <input
                        type="password"
                        value={editingAdmin.password}
                        onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                    />
                ) : (
                    "********"
                )}
            </td>

            {/* Fullname */}
            <td>
                {editingAdmin?.id === admin.id ? (
                    <input
                        type="text"
                        value={editingAdmin.fullname}
                        onChange={(e) => setEditingAdmin({ ...editingAdmin, fullname: e.target.value })}
                    />
                ) : (
                    admin.fullname
                )}
            </td>

            <td>{admin.created_at}</td>

            <td>{admin.is_active ? "Bật" : "Tắt"}</td>

            {/* Actions */}
            <td>
                {editingAdmin?.id === admin.id ? (
                    <button className="save-button" onClick={() => handleSaveClickWrapper(admin.id)}>Lưu</button>
                ) : (
                    <button className="update-button" onClick={() => handleEditClickWrapper(admin)}>Cập nhập</button>
                )}

                <button className="delete-button" onClick={() => handleDeleteClickWrapper(admin.id)}>Xóa</button>

                <button
                    className={`toggle-status-button ${admin.is_active ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleStatusClickWrapper(admin.id, admin.is_active)}
                >
                    {admin.is_active ? "Tắt" : "Bật"}
                </button>

                <button className="reset-button" onClick={() => handleResetPassClickWrapper(admin.id)}>Đặt lại</button>

            </td>
        </tr>
    );
};

export default AdminRow;
