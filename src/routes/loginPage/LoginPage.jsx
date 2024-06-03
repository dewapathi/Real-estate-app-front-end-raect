import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../loginPage/loginPage.scss";
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

export default function LoginPage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { updateUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/auth/login", {
                username,
                password
            });
            updateUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit} action="">
                    <h1>Welcome back</h1>
                    <input
                        type="text"
                        name='username'
                        required
                        minLength={3}
                        maxLength={20}
                        placeholder='Username'
                    />
                    <input
                        name='password'
                        type="password"
                        required
                        placeholder='Password'
                    />
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <Link to="/register">you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/images/bg.png" alt="" />
            </div>
        </div>
    )
};
