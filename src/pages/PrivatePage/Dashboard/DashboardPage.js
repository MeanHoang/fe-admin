import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavBar";
import './DashboardPage.scss';
const DashboardPage = () => {
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
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <h1>Xin chào admin</h1>
            </div>

        </div>
    );
};

export default DashboardPage;
