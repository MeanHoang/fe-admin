import React from "react";

import RegisterForm from "../../../features/register/components/RegisterForm";
import Navbar from "../../../components/NavBar";

const RegisterPage = () => {
    return (
        <div className="dashboard-page">
            <div className="">
                <Navbar />
            </div>
            <h1>Tạo tài khoản quản trị viên</h1>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage