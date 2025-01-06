import React from 'react';
import './UserSearch.scss';

const UserSearch = ({
    setSearchTerm,
    searchTerm
}) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Nhập địa chỉ email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default UserSearch;
