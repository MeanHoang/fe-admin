import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import Navbar from "../../../components/NavBar";
import './AddProdutPage.scss';

import AddProductForm from "../../../features/addProduct/components/AddProductForm";

const AddProdutPage = () => {
    const navigate = useNavigate();

    const [navbarStatus, setNavbarStatus] = useState(true);

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

                <AddProductForm />

            </div>
        </div>
    );
};

export default AddProdutPage;
