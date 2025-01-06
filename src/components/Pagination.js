import React from 'react';
import './Pagination.scss';
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="pagination-container">
            <p className="pagination-info">
                Trang {currentPage} / {totalPages} trang
            </p>
            <ul className="pagination-list">
                <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="pagination-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous">
                        &laquo;
                    </button>
                </li>

                {Array.from({ length: 2 }, (_, idx) => currentPage - 2 + idx).map(i => (
                    i > 0 && i <= totalPages && (
                        <li key={i} className={`pagination-item ${i === currentPage ? 'active' : ''}`}>
                            <button className="pagination-link" onClick={() => setCurrentPage(i)}>
                                {i}
                            </button>
                        </li>
                    )
                ))}

                <li className="pagination-item active">
                    <button className="pagination-link">
                        {currentPage}
                    </button>
                </li>

                {Array.from({ length: 2 }, (_, idx) => currentPage + 1 + idx).map(i => (
                    i <= totalPages && (
                        <li key={i} className={`pagination-item ${i === currentPage ? 'active' : ''}`}>
                            <button className="pagination-link" onClick={() => setCurrentPage(i)}>
                                {i}
                            </button>
                        </li>
                    )
                ))}

                <li className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="pagination-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next">
                        &raquo;
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
