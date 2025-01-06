import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { getAllUser } from "../services/getAllUser";

import {
    handleToggleStatusClick,
    handleResetPassClick
} from "../actions/UserListAction";

import UserRow from "./UserRow";
import UserSearch from "./UserSearch";
import './UserList.scss';
import Pagination from "../../../components/Pagination";

const UserList = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    alert("Xin vui lòng đăng nhập!");
                    window.location.href = "/login";
                    return;
                }

                // Gọi API
                const data = await getAllUser(currentPage, 7, searchTerm);

                setUsers(data.users);

                const total = data.total;
                const pages = Math.ceil(total / 7);

                setTotalPages(pages);
                if (currentPage < 1) {
                    setCurrentPage(1);
                } else if (currentPage > pages) {
                    setCurrentPage(pages);
                }

                setLoading(false);

            } catch (error) {
                setError(error.response?.data?.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage, searchTerm]);

    const handleToggleStatusClickWrapper = (id, userStatus) => {
        console.log('check id:', id);
        console.log('check userStatus: ', userStatus);

        const confirmToggle = window.confirm(`Bạn có thực sự muốn thay đổi trạng thái người dùng này?`);
        if (confirmToggle) {
            try {
                handleToggleStatusClick(id, userStatus, currentPage, setUsers);
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
                handleResetPassClick(id, currentPage, setUsers);
            } catch (error) {
                toast.error('Đặt lại mật khẩu thất bại!');
            }
        }
    };

    const gotoDetailUserPage = () => {
        navigate("/user-profile");
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Tài khoản người dùng</h2>
            <UserSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>SDT</th>
                        <th>Họ tên</th>
                        <th>Giới tính</th>
                        <th>Quyền truy cập</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        <UserRow
                            key={user.id}
                            user={user}
                            handleToggleStatusClickWrapper={handleToggleStatusClickWrapper}
                            handleResetPassClickWrapper={handleResetPassClickWrapper}
                            gotoDetailUserPage={gotoDetailUserPage}
                        />
                    )}
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

export default UserList;
