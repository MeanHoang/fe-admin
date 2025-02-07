import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getOptionByAttributeId } from "../services/getOptionByAttributeId";

import './AttributeOptionList.scss';

import { createOption } from "../services/createOption";
import {
    handleDeleteClick, handleEditClick,
    handleSaveClick
} from "../actions/AttributeOptionListAction";

import AttributeOptionRow from "./AttributeOptionRow";
import AddAttributeOptionForm from "./AddAttributeOptionForm";

const AttributeOptionList = (attributeId) => {
    const [attributeOptions, setAttributeOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingAttributeOption, setEditingAttributeOption] = useState(null);
    const attribute_id = attributeId.attributeId

    useEffect(() => {

        const fetchAttributeOption = async (attribute_id) => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    alert("Xin vui lòng đăng nhập!");
                    window.location.href = "/login";
                    return;
                }

                const data = await getOptionByAttributeId(attribute_id);

                setAttributeOptions(data.attributeOptions);

                console.log("check option: ", data.attributeOptions);
                setLoading(false);

            } catch (error) {
                setError(error.response?.data?.message || "Đã xảy ra lỗi khi tải dữ liệu.");
                setLoading(false);
            }
        };

        console.log("check attributeId: ", attributeId);

        fetchAttributeOption(attribute_id);
    }, [attribute_id])

    const handleAddAttributeOption = async (attributeOption) => {
        try {
            const newOption = await createOption(attributeOption);
            const data = await getOptionByAttributeId(attribute_id);

            setAttributeOptions(data.attributeOptions);
            toast.success("Thêm biến mới thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm >.<");
        }
    };

    const handleEditClickWrapper = (a) => {
        handleEditClick(a, setEditingAttributeOption);
    };

    const handleSaveClickWrapper = async (id) => {
        handleSaveClick(id, editingAttributeOption, setAttributeOptions,
            setEditingAttributeOption, attribute_id);
    };

    const handleDeleteClickWrapper = async (id) => {
        const confirm = window.confirm(`Bạn có thực sự muốn xóa giá trị này không?`);

        if (confirm) {
            try {
                handleDeleteClick(id, setAttributeOptions, attribute_id);
            } catch (error) {
                toast.error('Cập nhập trạng thái thất bại!');
            }
        }
    }
    return (
        <div>
            <h2>Lựa chọn cửa </h2>

            <div className="attribute-list-container">
                <div className="add-attribute-form">
                    <AddAttributeOptionForm
                        onAddAttributeOption={handleAddAttributeOption}
                        attribute_id={attribute_id}
                    />
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Gía trị</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {attributeOptions?.map((attributeOption) => (
                                <AttributeOptionRow
                                    key={attributeOption.id}
                                    attributeOption={attributeOption}
                                    editingAttributeOption={editingAttributeOption}
                                    setEditingAttributeOption={setEditingAttributeOption}
                                    handleDeleteClickWrapper={handleDeleteClickWrapper}
                                    handleEditClickWrapper={handleEditClickWrapper}
                                    handleSaveClickWrapper={handleSaveClickWrapper}
                                    attribute_id={attribute_id}
                                />
                            ))}
                        </tbody>
                    </table>
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
        </div>
    );
}

export default AttributeOptionList;