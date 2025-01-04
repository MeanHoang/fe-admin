import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAdmin } from "../services/gettAllAdminAPI";

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("Xin vui lòng đăng nhập!");
                    window.location.href = "/login";
                    return;
                }

                console.log("check token: ", token);
                const data = await getAllAdmin();
                setAdmins(data);
                setLoading(false);
            } catch (error) {
                setError(error.respone?.data?.message);
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Danh sách Admin</h1>
            <ul>
                {admins.map((admin) => (
                    <li key={admin.id}>{admin.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminList;