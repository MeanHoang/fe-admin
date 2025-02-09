import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import DashboardPage from "../pages/PrivatePage/Dashboard/DashboardPage";
import ManageAdminPage from "../pages/PrivatePage/Admin/ManageAdminPage";
import RegisterPage from "../pages/PrivatePage/Admin/RegisterPage";
import ManageUserPage from "../pages/PrivatePage/User/ManageUserPage";
import ManageCategoryPage from "../pages/PrivatePage/Category/ManageCategoryPage";
import AddCategoryPage from "../pages/PrivatePage/Category/AddCategoryPage";
import ManageAttribuePage from "../pages/PrivatePage/Attribute/ManageAttributePage";
import AttributeDetailPage from "../pages/PrivatePage/Attribute/AttributeDetailPage";
import ProductDetailPage from "../pages/PrivatePage/Product/ProductDetailPage";
import AddProdutPage from "../pages/PrivatePage/Product/AddProductPage";


import NotFoundPage from "../pages/PublicPage/NotFoundPage";


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

                <Route path="/manage-user" element={<ManageUserPage />} />

                <Route path="/manage-category" element={<ManageCategoryPage />} />
                <Route path="/add-category" element={<AddCategoryPage />} />

                <Route path="/manage-attribute" element={<ManageAttribuePage />} />
                <Route path="/attribute/:id" element={<AttributeDetailPage />} />

                <Route path="/product/create" element={<AddProdutPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />


            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
