import React from "react";
import './UserRow.scss';
const UserRow = ({
    user,
    handleToggleStatusClickWrapper,
    handleResetPassClickWrapper,
    gotoDetailUserPage
}) => {
    return (

        <tr key={user.id}>

            <td>{user.id}</td>

            <td>{user.email}</td>

            <td>{user.phonenumber}</td>
            <td>{user.fullname}</td>
            <td>{user.sex === null ? "" : user.sex ? "Nam" : "Nữ"}</td>

            {/* ToggleSwitch */}
            <td>
                <div
                    className={`toggle-switch ${user.is_active ? "active" : ""}`}
                    onClick={() =>
                        handleToggleStatusClickWrapper(user.id, user.is_active)
                    }
                >
                    <div className="switch"></div>
                </div>
            </td>

            <td>
                <button className="reset-button" onClick={() => handleResetPassClickWrapper(user.id)}>Đặt lại</button>
                <button className="detail-button" onClick={() => gotoDetailUserPage()}>Chi tiết</button>
            </td>

        </tr >
    )
};

export default UserRow;