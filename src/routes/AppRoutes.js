import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import DashboardPage from "../pages/PrivatePage/Dashboard/DashboardPage";
import ManageAdminPage from "../pages/PrivatePage/Admin/ManageAdminPage";
import RegisterPage from "../pages/PrivatePage/Admin/RegisterPage";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Route công khai */}
            <Route path="/*" element={<PublicRoutes />} />

            {/* Route bảo vệ */}
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/manage-admin" element={<ManageAdminPage />} />

                <Route path="/reg" element={<RegisterPage />} />

            </Route>
        </Routes>
    );
};

export default AppRoutes;
