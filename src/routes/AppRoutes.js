import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import DashboardPage from "../pages/PrivatePage/Dashboard/DashboardPage";
import AdminList from "../features/adminList/components/AdminList";
import RegisterForm from "../features/register/components/RegisterForm";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Route công khai */}
            <Route path="/*" element={<PublicRoutes />} />

            {/* Route bảo vệ */}
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/manage-admin" element={<AdminList />} />

                <Route path="/reg" element={<RegisterForm />} />

            </Route>
        </Routes>
    );
};

export default AppRoutes;
