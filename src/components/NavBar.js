import React from 'react';
import './NavBar.scss';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FaHome, FaUsers, FaProductHunt, FaTags, FaListAlt, FaChartBar, FaSignOutAlt } from 'react-icons/fa'; // Thư viện icon

const Navbar = () => {

    const navigate = useNavigate();

    const gotoDashboardPage = () => {
        navigate("/dashboard");
    };

    const gotoManageAdminPage = () => {
        navigate("/manage-admin");
    };

    const gotoManageCategoryPage = () => {
        navigate("/manage-category");
    };

    const gotoManageOrderPage = () => {
        navigate("/order");
    };

    const gotoManageAttributesPage = () => {
        navigate("/manage-attribute");
    };

    const gotoReportPage = () => {
        navigate("/report");
    };

    const gotoManageUserPage = () => {
        navigate("/manage-user");
    };

    const gotoManageProductPage = () => {
        navigate("/manage-product");
    };

    const gotoLoginPage = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul>
                <li>
                    <a href="#" onClick={gotoDashboardPage}>
                        <FaHome className="icon" />
                        Trang chủ
                    </a>
                </li>

                <li>
                    <a href="#" onClick={gotoManageAdminPage}>
                        <FaUsers className="icon" />
                        Quản trị viên
                    </a>
                </li>

                <li>
                    <a href="#" onClick={gotoManageUserPage}>
                        <FaUsers className="icon" />
                        Người dùng
                    </a>
                </li>

                <li className="has-submenu">
                    <a href="#">
                        <FaProductHunt className="icon" />
                        Sản phẩm
                    </a>
                    <ul className="submenu">
                        <li>
                            <a href="#" onClick={gotoManageProductPage}>
                                <FaListAlt className="icon" />
                                Sản phẩm
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={gotoManageCategoryPage}>
                                <FaTags className="icon" />
                                Danh mục
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={gotoManageAttributesPage}>
                                <FaTags className="icon" />
                                Thuộc tính
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#" onClick={gotoManageOrderPage}>
                        <FaListAlt className="icon" />
                        Đơn hàng
                    </a>
                </li>

                <li>
                    <a href="#" onClick={gotoReportPage}>
                        <FaChartBar className="icon" />
                        Thống kê
                    </a>
                </li>

                <li>
                    <a href="#" onClick={gotoLoginPage}>
                        <FaSignOutAlt className="icon" />
                        Đăng xuất
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;