import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavBar";
import './ManageAdminPage.scss';
import AdminList from "../../../features/adminList/components/AdminList";

const ManageAdminPage = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

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

    const toggleNavbar = () => {
        setIsNavbarVisible(!isNavbarVisible);
    };

    return (
        <div className="dashboard-page">
            <div className={`navbar ${!isNavbarVisible ? 'hidden' : ''}`}>
                <Navbar />
            </div>
            <div className="content">
                <AdminList />
            </div>
        </div>
    );
};

export default ManageAdminPage;
