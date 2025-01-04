import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../features/login/components/LoginForm";
import './LoginPage.scss';

const LoginPage = () => {


    return (
        <div className="login-page">
            <LoginForm />

        </div>
    );
};

export default LoginPage;
