import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Không tìm thấy trang</h1>
            <p>Trang bạn tìm kiếm không tồn tại.</p>
            <Link to="/">Quay lại trang chủ</Link>
        </div>
    );
};

export default NotFoundPage;
