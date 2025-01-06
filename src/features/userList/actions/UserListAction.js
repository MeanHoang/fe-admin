import { toast } from "react-toastify";

import { getAllUser } from "../services/getAllUser";
import { updateUser } from "../services/updateUser";
import { resetPassword } from "../services/resetPassword";

export const handleToggleStatusClick = async (id, useFormStatus,
    currentPage, setUsers) => {
    try {
        const updatedUser = {
            id,
            is_active: !useFormStatus,
        };

        const result = await updateUser(updatedUser);
        const data = await getAllUser(currentPage);
        setUsers(data.users);
        toast.success(result.message);
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
}

export const handleResetPassClick = async (id, currentPage, setUsers) => {
    try {
        const result = await resetPassword(id);

        const data = await getAllUser(currentPage);
        setUsers(data.users);

        toast.success(result.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Đặt lại mật khẩu thất bại!");
    }
}