import { toast } from "react-toastify";

import { deleteProduct } from "../services/deleteProduct";
import { getAllProduct } from "../services/getAllProduct";

export const handleDeleteClick = async (id, currentPage, setProducts) => {
    try {
        const result = await deleteProduct(id);

        const data = await getAllProduct(currentPage);

        setProducts(data.products);

        toast.success(result.message);
    } catch (error) {
        toast.error('Xóa thất bại!');
    }
}