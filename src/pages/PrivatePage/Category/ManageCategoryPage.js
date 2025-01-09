import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import Navbar from "../../../components/NavBar";
import './ManageCategoryPage.scss';

import CategoryList from "../../../features/categoryList/components/CategoryList";

const ManageCategoryPage = () => {
    const navigate = useNavigate();

    const [navbarStatus, setNavbarStatus] = useState(true);

    const gotoAddCategoryPage = () => {
        navigate("/add-category");
    };

    const handleToggleNavbar = () => {
        setNavbarStatus(!navbarStatus);
    };
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Xin vui lòng đăng nhập!");
                window.location.href = "/login";
            }
            console.log("check token: ", token);
        };
        checkToken();
    }, []);


    return (
        <div className="dashboard-page">
            <div className={`navbar ${navbarStatus ? "open" : "closed"}`}>
                {navbarStatus && <Navbar />}
            </div>
            <div className="content">
                <button className="toggle-navbar-btn" onClick={handleToggleNavbar}>
                    <MdMenu size={24} />
                </button>

                <CategoryList className="category-list" />

                <a href="#" onClick={gotoAddCategoryPage}>
                    Thêm danh mục
                </a>

            </div>
        </div>
    );
};

export default ManageCategoryPage;