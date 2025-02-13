import React from "react";
import { useNavigate } from "react-router-dom";
import './ProductRow.scss';

const ProductRow = ({
    product,
    handleDeleteClickWrapper,
}) => {

    const navigate = useNavigate();
    const gotoManageProductDetail = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <tr>
            <td>{product.id}</td>

            {/* Ảnh minh họa */}
            <td>
                <img src={product.image_url_default} alt="Ảnh sản phẩm" width="50" />
            </td>

            {/* Tên sản phẩm */}
            <td>
                {product.name}
            </td>

            {/* Giá tiền */}
            <td>
                {product.price}
            </td>

            {/* Ngày tạo */}
            <td>
                {product.created_at}
            </td>

            <td>
                <button
                    className="edit-button"
                    onClick={() => gotoManageProductDetail(product.id)}
                >
                    Cập nhập
                </button>

                <button className="delete-button"
                    onClick={() => handleDeleteClickWrapper(product.id)}>
                    Xóa
                </button>

            </td>
        </tr>
    );
};

export default ProductRow;
