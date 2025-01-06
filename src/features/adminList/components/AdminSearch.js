import React from 'react';

const AdminSearch = ({ }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default AdminSearch;
