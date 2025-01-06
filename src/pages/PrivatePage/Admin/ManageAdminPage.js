import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import Navbar from "../../../components/NavBar";
import './ManageAdminPage.scss';

import AdminList from "../../../features/adminList/components/AdminList";

const ManageAdminPage = () => {
    const navigate = useNavigate();

    const [navbarStatus, setNavbarStatus] = useState(true);

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

    const gotoRegisterPage = () => {
        navigate("/reg");
    };

    const handleToggleNavbar = () => {
        setNavbarStatus(!navbarStatus);
    };

    return (
        <div className="dashboard-page">
            <div className={`navbar ${navbarStatus ? "open" : "closed"}`}>
                {navbarStatus && <Navbar />}
            </div>
            <div className="content">
                <button className="toggle-navbar-btn" onClick={handleToggleNavbar}>
                    <MdMenu size={24} />
                </button>

                <AdminList className="admin-list" />

                <a href="#" onClick={gotoRegisterPage}>
                    Thêm tài khoản
                </a>
            </div>
        </div>
    );
};

export default ManageAdminPage;
