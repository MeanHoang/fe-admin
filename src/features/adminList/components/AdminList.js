import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';

import { getAllAdmin } from "../services/gettAllAdmin";

import {
    handleEditClick, handleSaveClick,
    handleDeleteClick, handleToggleStatusClick,
    handleResetPassClick
} from "../actions/AdminListAction";

import './AdminList.scss';
import Pagination from "../../../components/Pagination";
import AdminRow from "./AdminRow";
import AdminSearch from "./AdminSearch";

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingAdmin, setEditingAdmin] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("Xin vui lòng đăng nhập!");
                    window.location.href = "/login";
                    return;
                }

                //console.log("Follow searchTerm:", searchTerm);

                // Gọi API 
                const data = await getAllAdmin(currentPage, 7, searchTerm);

                // Cập nhật danh sách admin
                setAdmins(data.admins);

                // Tính toán tổng số trang
                const total = data.total; // Giả sử `total` là tổng số admin
                const pages = Math.ceil(total / 7); // 7 admin mỗi trang
                setTotalPages(pages);

                console.log("Check total page th: ", pages);
                console.log("Check this page th: ", currentPage);

                // Điều chỉnh `currentPage` nếu vượt quá giới hạn
                if (currentPage < 1) {
                    setCurrentPage(1);
                } else if (currentPage > pages) {
                    setCurrentPage(pages);
                }

                setLoading(false);
            } catch (error) {
                // Xử lý lỗi
                setError(error.response?.data?.message || "Đã xảy ra lỗi khi tải dữ liệu.");
                setLoading(false);
            }
        };

        fetchAdmins();
    }, [currentPage, searchTerm]);


    const handleEditClickWrapper = (admin) => {
        handleEditClick(admin, setEditingAdmin);
    };

    const handleSaveClickWrapper = async (id) => {
        await handleSaveClick(id, editingAdmin, currentPage, setAdmins,
            setEditingAdmin);
    };

    const handleDeleteClickWrapper = async (id) => {
        console.log('Click delete button, id:', id);
        const confirmToggle = window.confirm(`Bạn có thực sự muốn xóa admin này không?`);

        if (confirmToggle) {
            try {
                console.log('Deleting admin with id:', id);
                handleDeleteClick(id, currentPage, setAdmins);
            } catch (error) {
                toast.error('Xóa thất bại!');
            }
        }
    };

    const handleToggleStatusClickWrapper = (id, adminStatus) => {
        console.log('check id:', id);
        console.log('check adminStatus: ', adminStatus);
        const confirmToggle = window.confirm(`Bạn có thực sự muốn thay đổi trạng thái admin này?`);
        if (confirmToggle) {
            try {
                handleToggleStatusClick(id, adminStatus, currentPage, setAdmins);
            } catch (error) {
                toast.error('Cập nhập trạng thái thất bại!');
            }
        }
    };

    const handleResetPassClickWrapper = (id) => {
        console.log("check id for reset: ", id);

        const confirmToggle = window.confirm(`Bạn có muốn cài lại mật khẩu mặc định cho tài khoản này hay không?`);
        if (confirmToggle) {
            try {
                handleResetPassClick(id, currentPage, setAdmins);
            } catch (error) {
                toast.error('Đặt lại mật khẩu thất bại!');
            }
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Tài khoản quản trị viên</h2>
            <AdminSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Họ và tên</th>
                        <th>Ngày tạo</th>
                        <th>Quyền truy cập</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <AdminRow
                            key={admin.id}
                            admin={admin}
                            editingAdmin={editingAdmin}
                            setEditingAdmin={setEditingAdmin}
                            handleSaveClickWrapper={handleSaveClickWrapper}
                            handleEditClickWrapper={handleEditClickWrapper}
                            handleDeleteClickWrapper={handleDeleteClickWrapper}
                            handleToggleStatusClickWrapper={handleToggleStatusClickWrapper}
                            handleResetPassClickWrapper={handleResetPassClickWrapper}
                        />
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default AdminList;
