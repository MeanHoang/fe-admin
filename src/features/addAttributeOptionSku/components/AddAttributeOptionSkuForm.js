import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getAllAttribute } from "../../attributeList/services/getAllAttribute";
import { getOptionByAttributeId } from "../../attributeOptionList/services/getOptionByAttributeId";
import { createAttributeOptionSku } from "../service/createAttributeOptionSku";
import { getAttributeOptionsSkuBySkuId } from "../service/getAttributeOptionsSkuBySkuId";

import AttributeOptionDetail from "../../attributeOptionDetail/components/AttributeOptionDetail";

const AddAttributeOptionSkuForm = ({ skuId }) => {
    const navigate = useNavigate();
    const [attributes, setAttributes] = useState([]);
    const [options, setOptions] = useState([]);
    const [attributeOptionSku, setAttributeOptionSku] = useState([]);
    const [attributeOption, setAttributeOptions] = useState([]);
    const [selectedAttribute, setSelectedAttribute] = useState("");
    const [formData, setFormData] = useState({
        sku_id: skuId || "",
        attribute_option_id: ""
    });

    // Lấy danh sách Attributes khi component mount
    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const data = await getAllAttribute();
                setAttributes(data.attributes);

                const existingOptions = await getAttributeOptionsSkuBySkuId(skuId);
                setAttributeOptionSku(existingOptions);
            } catch (error) {
                console.error("Error fetching attributes:", error);
            }
        };
        fetchAttributes();
    }, []);

    // Lấy danh sách Attribute Options khi chọn Attribute
    useEffect(() => {
        if (selectedAttribute) {
            const fetchOptions = async () => {
                try {
                    const data = await getOptionByAttributeId(selectedAttribute);
                    setOptions(data.attributeOptions);
                } catch (error) {
                    console.error("Error fetching options:", error);
                }
            };
            fetchOptions();
        }
    }, [selectedAttribute]);

    // Xử lý thay đổi trong form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAttributeChange = (e) => {
        setSelectedAttribute(e.target.value);
        setFormData({ ...formData, attribute_option_id: "" });
    };

    // Gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAttributeOptionSku(formData);
            toast.success("Thêm thành công!");

            // Cập nhật danh sách attributeOptions sau khi thêm mới
            const updatedOptions = await getAttributeOptionsSkuBySkuId(skuId);
            setAttributeOptions(updatedOptions);

        } catch (error) {
            toast.error("Lỗi khi thêm!");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Chọn Attribute:</label>
                <select value={selectedAttribute} onChange={handleAttributeChange}>
                    <option value="">-- Chọn Attribute --</option>
                    {attributes.map(attr => (
                        <option key={attr.id} value={attr.id}>
                            {attr.name}
                        </option>
                    ))}
                </select>

                {selectedAttribute && (
                    <>
                        <label>Chọn Attribute Option:</label>
                        <select name="attribute_option_id" value={formData.attribute_option_id} onChange={handleChange}>
                            <option value="">-- Chọn Option --</option>
                            {options.map(option => (
                                <option key={option.id} value={option.id}>
                                    {`${option.name} (${option.value})`}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                <button type="submit">Tạo</button>
            </form>

            <ul>
                {attributeOptionSku.length > 0 ? (
                    attributeOptionSku.map((attributeOptionSku) => (
                        <li key={attributeOptionSku.id}>
                            <AttributeOptionDetail attribute_option_id={attributeOptionSku.attribute_option_id} />
                        </li>
                    ))
                ) : (
                    <p>Không có Attribute Options nào.</p>
                )}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default AddAttributeOptionSkuForm;
