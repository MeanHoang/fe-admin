import React from 'react';
import './AdminSearch.scss';

const AdminSearch = ({
    setSearchTerm,
    searchTerm
}) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Nhập tên tài khoản"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default AdminSearch;
