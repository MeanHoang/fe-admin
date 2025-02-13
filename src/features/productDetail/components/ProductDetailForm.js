import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { getProductById } from "../services/getProductById";
import { getAllCategory } from "../../categoryList/services/getAllCategory";
import { updateProduct } from "../services/updateProduct";

import "./ProductDetailForm.scss";

const ProductDetailForm = ({ productId }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        category_id: "",
        desc: "",
        material: "",
        origin: "",
        price: "",
        image_url_default: ""
    });

    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategory();
                setCategories(data.categories);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            }
        };

        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("Xin vui lòng đăng nhập!");
                    window.location.href = "/login";
                    return;
                }
                const productData = await getProductById(productId);

                // Nếu image_url_default là mảng, lấy URL hợp lệ đầu tiên
                const validImageUrl = Array.isArray(productData.image_url_default)
                    ? productData.image_url_default.find(url => typeof url === "string")
                    : productData.image_url_default;

                setProduct({ ...productData, image_url_default: validImageUrl || "" });
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || "Đã xảy ra lỗi khi tải dữ liệu.");
                setLoading(false);
            }
        };

        fetchCategories();
        fetchProduct();
    }, [productId]);

    const handleUpdateProduct = async (e) => {
        try {
            e.preventDefault();

            const updatedProductData = {
                id: product.id,
                name: product.name,
                desc: product.desc,
                price: product.price,
                origin: product.origin,
                material: product.material,
                category_id: product.category_id
            };

            if (selectedImage) {
                updatedProductData.image_url_default = selectedImage;
            }
            console.log("check file: ", selectedImage);

            const response = await updateProduct(updatedProductData, selectedImage);
            console.log("check res", response);

            toast.success("Cập nhật sản phẩm thành công!");
            navigate("/manage-product");
        } catch (error) {
            toast.error(error.response?.data?.message || "Cập nhật thất bại!");
        }
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type;
            if (!["image/jpeg", "image/png", "image/jpg"].includes(fileType)) {
                toast.error("Chỉ chấp nhận ảnh .jpg hoặc .png!");
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error("Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB!");
                return;
            }

            const previewUrl = URL.createObjectURL(selectedFile);

            // Cập nhật cả selectedImage và product.image_url_default
            setSelectedImage(selectedFile);
            setImagePreview(previewUrl);
        }
    };

    const gotoManageProductPage = () => {
        navigate("/manage-product");
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Chi tiết sản phẩm</h2>
            <div className="product-detail-form">
                <div className="left-section">
                    <label>Tên sản phẩm:</label>
                    <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />

                    <label>Mô tả:</label>
                    <textarea value={product.desc} onChange={(e) => setProduct({ ...product, desc: e.target.value })}></textarea>

                    <label>Chất liệu:</label>
                    <input type="text" value={product.material} onChange={(e) => setProduct({ ...product, material: e.target.value })} />

                    <label>Xuất xứ:</label>
                    <input type="text" value={product.origin} onChange={(e) => setProduct({ ...product, origin: e.target.value })} />

                    <label>Giá:</label>
                    <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                </div>

                <div className="right-section">
                    <div className="button-group">
                        <button className="update"
                            onClick={handleUpdateProduct}>Cập nhật</button>
                        <button className="cancel"
                            onClick={gotoManageProductPage}>Hủy</button>
                    </div>

                    {imagePreview ? (
                        <img src={imagePreview} alt="Ảnh xem trước" className="product-image" />
                    ) : (
                        typeof product.image_url_default === "string" && product.image_url_default.trim() && (
                            <img src={product.image_url_default} alt="Ảnh sản phẩm" className="product-image" />
                        )
                    )}

                    <label className="upload-btn">
                        Tải ảnh lên
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </label>

                    <label>Danh mục sản phẩm:</label>
                    <select
                        value={product.category_id || ""}
                        onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
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

export default ProductDetailForm;
