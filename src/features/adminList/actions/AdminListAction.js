import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import { updateAdmin } from "../services/updateAdmin";
import { getAllAdmin } from "../services/gettAllAdmin";
import { deleteAdmin } from '../services/deleteAdmin';
import { resetPassword } from '../services/resetPassword';

export const handleEditClick = (admin, setEditingAdmin) => {
    setEditingAdmin(admin);
};

export const handleSaveClick = async (id, editingAdmin, currentPage,
    setAdmins, setEditingAdmin) => {
    try {
        const updatedAdmin = {
            id,
            username: editingAdmin.username,
            fullname: editingAdmin.fullname,
            is_active: editingAdmin.is_active
        };

        const result = await updateAdmin(updatedAdmin);
        const data = await getAllAdmin(currentPage);
        setAdmins(data.admins);
        setEditingAdmin(null);
        toast.success(result.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Cập nhật thất bại!");
    }
};

export const handleDeleteClick = async (id, currentPage, setAdmins) => {
    try {
        const result = await deleteAdmin(id);

        console.log("check id for delete: ", id);

        const data = await getAllAdmin(currentPage);
        setAdmins(data.admins);
        toast.success(result.message);
    } catch (error) {
        toast.error('Xóa thất bại!');
    }
}

export const handleToggleStatusClick = async (id, adminStatus,
    currentPage, setAdmins) => {
    try {
        const updatedAdmin = {
            id,
            is_active: !adminStatus,
        };

        const result = await updateAdmin(updatedAdmin);
        const data = await getAllAdmin(currentPage);
        setAdmins(data.admins);
        toast.success(result.message || "Cập nhật trạng thái thành công!");
    } catch (error) {
        toast.error(error.response?.data?.message || "Cập nhật trạng thái thất bại!");
    }
};

export const handleResetPassClick = async (id, currentPage, setAdmins) => {
    try {
        const result = await resetPassword(id);

        const data = await getAllAdmin(currentPage);
        setAdmins(data.admins);

        toast.success(result.message);

    } catch (error) {
        toast.error(error.response?.data?.message || "Đặt lại mật khẩu thất bại!");
    }
}

