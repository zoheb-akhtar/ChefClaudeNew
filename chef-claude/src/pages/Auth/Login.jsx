import React, { useEffect, useState } from 'react'
import "./auth.css"
import validEmail from '../../utils/validEmail';
import validateLoginForm from '../../utils/validateLoginForm';
import { useNavigate } from 'react-router-dom';
import api from "../../api/apiInstance.js"
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import AuthInput from '../../components/Auth/AuthInput/AuthInput';
import AuthCallToActionMsg from '../../components/Auth/AuthCallToActionMsg/AuthCallToActionMsg';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            navigate("/dashboard");
        }
    }, [navigate])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!validEmail(email)) {
                setError("Please enter a valid email");
                return;
            }

            const validationError = validateLoginForm(email, password);
            if (validationError) {
                setError(validationError);
                return;
            }
    
            const { data } = await api.post("/auth/login", {email, password});
            localStorage.setItem("accessToken", data.accessToken);
            navigate("/dashboard");

        } catch (error) {
            setError(error?.response?.data?.error || "Something went wrong. Please try again later.")
        }

    }

  return (
    <div className="auth-wrapper">
        <form onSubmit={handleSubmit} className="auth-container">
            <p className="auth-header">Login</p>
            <AuthInput 
            divClassName="auth-email-container"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputClassName="auth-email-input"
            placeholder="Enter your email"
            type="email"
            />

            <AuthInput 
            divClassName="auth-password-container"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputClassName="auth-password-input"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            includeVisToggle={true}
            />
            <ErrorMessage error={error} bgColor="white"/>

            <button className="submit-auth-button" type="submit">Login</button>
        
            <AuthCallToActionMsg 
            messageText="Don't have an account?"
            linkText="Sign Up"
            link="/signup"
            />
        </form>
    </div>
    
  )
}
