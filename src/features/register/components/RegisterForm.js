import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/regAPI";

const RegisterForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await register({ username, password, fullname });
            console.log("check mess regis: ", data.message);
            alert("Register succced");
            navigate("/login");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }

    }
    return (
        <div>
            <h1>Tạo tài khoản admin</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fullname">Fullname</label>
                    <input
                        type="text"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                        placeholder="Fullname"
                    />
                </div>

                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </button>
            </form>
        </div>
    );

};

export default RegisterForm;