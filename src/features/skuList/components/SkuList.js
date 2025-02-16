import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AddSkuForm from "../../addSku/components/AddSkuForm";
import AddAttributeOptionSkuForm from "../../addAttributeOptionSku/components/AddAttributeOptionSkuForm";

import { getSkuByProductId } from "../service/getSkuByProductId";
import { deleteSku } from "../service/deleteSku";

import './SkuList.scss';

const SkuList = ({ productId }) => {
    const [skus, setSkus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) return;

        const fetchData = async () => {
            try {
                const data = await getSkuByProductId(productId);
                setSkus(data);

                // console.log("check data: ", data);

                setSkus(data);
            } catch (err) {
                setError(err);
                setSkus([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const handleDeleteSku = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa SKU này không?")) return;

        try {
            await deleteSku(id);
            toast.success("Xóa SKU thành công!");

            setSkus((prevSkus) => prevSkus.filter((sku) => sku.id !== id));
        } catch (error) {
            toast.error(`Lỗi khi xóa SKU: ${error}`);
        }
    };

    if (loading) return <p>Đang tải danh sách SKU...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h2>SKU </h2>

            <AddSkuForm productId={productId} />

            <div className="sku-container">
                {skus.map((sku) => (
                    <div key={sku.id} className="sku-card">
                        <img src={sku.image_url_default} alt={`SKU ${sku.id}`} className="sku-image" />
                        <div className="sku-details">
                            <div className="sku-info">
                                <p><strong>ID:</strong> {sku.id}</p>
                                <p><strong>Giá:</strong> {sku.price.toLocaleString()} VND</p>
                                <AddAttributeOptionSkuForm skuId={sku.id} />
                            </div>
                            <div className="sku-actions">
                                <button className="update-btn">Cập nhật</button>
                                <button className="delete-btn"
                                    onClick={() => handleDeleteSku(sku.id)}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
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
        </div >
    );
};

export default SkuList;
