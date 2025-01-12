import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getAllAttribute } from "../services/getAllAttribute";
import { createAttribute } from "../services/createAttribute";

import './AttributeList.scss';
import AttributeRow from "./AttributeRow";
import AddAttributeForm from "./AddAttributeForm";

import {
    handleDeleteClick, handleSaveClick,
    handleEditClick
} from "../actions/AttributeListAction";

const AttributeList = () => {
    const [attributes, setAttributes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingAttribute, setEditingAttribute] = useState(null);

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    alert("Xin vui lòng đăng nhập!");
                    window.location.href = "/login";
                    return;
                }

                const data = await getAllAttribute();

                setAttributes(data.attributes);

                console.log("check attributes: ", data.attributes);

                setLoading(false);
            } catch (error) {
                // Xử lý lỗi
                setError(error.response?.data?.message || "Đã xảy ra lỗi khi tải dữ liệu.");
                setLoading(false);
            }
        };

        fetchAttributes();
    }, []);

    const handleAddAttribute = async (attribute) => {
        try {
            const newAttribute = await createAttribute(attribute);
            const data = await getAllAttribute();

            setAttributes(data.attributes);
            toast.success("Thêm danh mục thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm thuộc tính.");
        }
    };


    const handleDeleteClickWrapper = async (id) => {
        console.log('Click delete button, id:', id);
        const confirmToggle = window.confirm(`Bạn có thực sự muốn xóa danh mục này không?`);
        if (confirmToggle) {
            try {
                console.log('Deleting attr with id:', id);
                handleDeleteClick(id, setAttributes);
            } catch (error) {
                toast.error('Xóa thất bại!');
            }
        }
    };

    const handleEditClickWrapper = (attribute) => {
        handleEditClick(attribute, setEditingAttribute);
    };

    const handleSaveClickWrapper = async (id) => {
        await handleSaveClick(id, editingAttribute, setAttributes,
            setEditingAttribute());
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>;
    return (
        <div>
            <h2>Thuộc tính sản phẩm</h2>

            <div className="attribute-list-container">
                <div className="add-attribute-form">
                    <AddAttributeForm onAddAttribute={handleAddAttribute} />
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên danh mục</th>
                                <th>Ghi chú</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {attributes.map((attribute) => (
                                <AttributeRow
                                    key={attribute.id}
                                    attribute={attribute}
                                    editingAttribute={editingAttribute}
                                    setEditingAttribute={setEditingAttribute}
                                    handleSaveClickWrapper={handleSaveClickWrapper}
                                    handleEditClickWrapper={handleEditClickWrapper}
                                    handleDeleteClickWrapper={handleDeleteClickWrapper}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );

}


export default AttributeList;