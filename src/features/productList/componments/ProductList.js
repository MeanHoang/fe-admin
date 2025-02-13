import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getAllProduct } from "../services/getAllProduct";

import { handleDeleteClick } from "../actions/ProductListAction";

import ProductRow from "./ProductRow";
import ProductSearch from "./ProductSearch";
import Pagination from "../../../components/Pagination";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    alert("Xin vui lòng đăng nhập!");
                    window.location.href = "/login";
                    return;
                }

                const data = await getAllProduct(currentPage, 7, searchTerm);

                setProducts(data.products);

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

        fetchProduct();
    }, [currentPage, searchTerm]);


    const handleDeleteClickWrapper = async (id) => {
        console.log('Click delete button, id: ', id);
        const confirmToggle = window.confirm(`Bạn có thực sự muốn xóa sản phẩm này không?`);

        if (confirmToggle) {
            try {
                handleDeleteClick(id, currentPage, setProducts);
            } catch (error) {
                toast.error('Xóa thất bại do sản phẩm đang được sử dụng!');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>

            <ProductSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ảnh minh họa</th>
                        <th>Tên sản phẩm</th>
                        <th>Gía tiền</th>
                        <th>Ngày tạo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            handleDeleteClickWrapper={handleDeleteClickWrapper}
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

export default ProductList;