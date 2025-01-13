import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getAllCategory } from "../services/getAllCategory";

import {
    handleDeleteClick, handleSaveClick,
    handleEditClick, handleToggleStatusClick
} from "../actions/CategoryListAction";

import CategoryRow from "./CategoryRow";
import Pagination from "../../../components/Pagination";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    alert("Xin vui lòng đăng nhập!");
                    window.location.href = "/login";
                    return;
                }

                const data = await getAllCategory(currentPage, 7, searchTerm);

                setCategories(data.categories);

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
                setError(error.response?.data?.message || "Đã xảy ra lỗi khi tải dữ liệu.");
                setLoading(false);
            }
        };

        fetchCategory();
    }, [currentPage, searchTerm]);

    const handleEditClickWrapper = (a) => {
        handleEditClick(a, setEditingCategory);
    };

    const handleSaveClickWrapper = async (id) => {
        handleSaveClick(id, editingCategory, currentPage, setCategories,
            setEditingCategory);
    };

    const handleDeleteClickWrapper = async (id) => {
        console.log('Click delete button, id: ', id);
        const confirmToggle = window.confirm(`Bạn có thực sự muốn xóa danh mục này không?`);

        if (confirmToggle) {
            try {
                handleDeleteClick(id, currentPage, setCategories);
            } catch (error) {
                toast.error('Xóa thất bại do danh mục đang được sử dụng!');
            }
        }
    };

    const handleToggleStatusClickWrapper = (id, categoryStatus) => {
        console.log('check id:', id);
        console.log('check categoryStatus: ', categoryStatus);
        const confirmToggle = window.confirm(`Bạn có thực sự muốn thay đổi trạng thái ?`);
        if (confirmToggle) {
            try {
                handleToggleStatusClick(id, categoryStatus, currentPage, setCategories);
            } catch (error) {
                toast.error('Cập nhập trạng thái thất bại!');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Danh sách danh mục sản phẩm</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <CategoryRow
                            key={category.id}
                            category={category}
                            editingCatgory={editingCategory}
                            setEditingCategory={setEditingCategory}
                            handleDeleteClickWrapper={handleDeleteClickWrapper}
                            handleEditClickWrapper={handleEditClickWrapper}
                            handleSaveClickWrapper={handleSaveClickWrapper}
                            handleToggleStatusClickWrapper={handleToggleStatusClickWrapper}
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

export default CategoryList;