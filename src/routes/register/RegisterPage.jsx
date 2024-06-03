import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../register/register.scss";
import apiRequest from '../../lib/apiRequest';

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(username, email, password);
        try {
            await apiRequest.post("/auth/register", {
                username, email, password
            });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message)
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="registerPage">
            <div className="formContainer">
                <form action="" onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input name='username' type="text" placeholder='Username' />
                    <input name='email' type="email" placeholder='Email' />
                    <input name='password' type="password" placeholder='Password' />
                    <button disabled={isLoading}>Register</button>
                    {error && <span>{error}</span>}
                    <Link to="/login">Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/images/bg.png" alt="" />
            </div>
        </div>
    )
}
