import React from 'react';
import './ProductSearch.scss';

const ProductSearch = ({
    setSearchTerm,
    searchTerm
}) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default ProductSearch;
