import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getOptionByAttributeId } from "../services/getAttributeOptionById";

const AttributeOptionDetail = ({ attribute_option_id }) => {
    const [attributeOption, setAttributeOption] = useState(null);

    useEffect(() => {
        const fetchAttributeOption = async () => {
            if (!attribute_option_id) return;

            try {
                const data = await getOptionByAttributeId(attribute_option_id);
                if (data) {
                    setAttributeOption(data.attributeOption);
                    console.log("check data AttributeOptionDetail: ", data);

                } else {
                    toast.error("Không tìm thấy Attribute Option!");
                }
            } catch (error) {
                toast.error("Lỗi khi tải dữ liệu!");
            }
        };

        fetchAttributeOption();
    }, [attribute_option_id]);

    return (
        <div>
            {attributeOption ? (
                <p>
                    <strong>{attributeOption.name}:</strong> {attributeOption.value}
                </p>
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}

            <ToastContainer />
        </div>
    );
};

export default AttributeOptionDetail;
