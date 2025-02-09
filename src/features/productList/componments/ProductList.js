import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getAllProduct } from "../services/getAllProduct";

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

                const data = await getAllProduct( currentPage, 7, searchTerm);

                setProducts(data.products);

                
            } catch (error) {

            }
        }
    })
}