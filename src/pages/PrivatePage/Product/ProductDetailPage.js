import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import Navbar from "../../../components/NavBar";
import './ProductDetailPage.scss';


const ProductDetailPage = () => {
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

    const handleToggleNavbar = () => {
        setNavbarStatus(!navbarStatus);
    };

    const { id } = useParams();

    return (
        <div className="dashboard-page">
            <div className={`navbar ${navbarStatus ? "open" : "closed"}`}>
                {navbarStatus && <Navbar />}
            </div>
            <div className="content">
                <button className="toggle-navbar-btn" onClick={handleToggleNavbar}>
                    <MdMenu size={24} />
                </button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
