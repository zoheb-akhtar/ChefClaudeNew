import React, { useState } from 'react'
import "./auth.css"
import validateSignupForm from '../../utils/validateSignupForm';
import { useNavigate } from 'react-router-dom';
import api from "../../api/apiInstance.js"
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import AuthInput from '../../components/Auth/AuthInput/AuthInput';
import AuthCallToActionMsg from '../../components/Auth/AuthCallToActionMsg/AuthCallToActionMsg';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {

      const validationError = validateSignupForm(email, password, firstName, lastName, confirmPassword);
      if (validationError) {
        setError(validationError);
        return;
      }
      

     await api.post("/auth/register", {
      email: email.trim(), 
      password, 
      firstName: firstName.trim(), 
      lastName: lastName.trim()});
     navigate("/login");

    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong. Please try again later.")
    }
  }

  return (
    <div className="auth-wrapper">
    <form onSubmit={handleSubmit} className="auth-container signup-container">
        <p className="auth-header">Sign Up</p>
        <div className="auth-name-container">

        <AuthInput 
            divClassName="auth-first-name-container"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            inputClassName="auth-first-name-input"
            placeholder="Enter your first name"
            type="text"
          />

          <AuthInput 
            divClassName="auth-last-name-container"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            inputClassName="auth-last-name-input"
            placeholder="Enter your last name"
            type="text"
          />
        </div>

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

        <AuthInput 
          divClassName="auth-password-container"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          inputClassName="auth-password-input"
          placeholder="Enter your password again"
          type={showPassword ? "text" : "password"}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          includeVisToggle={true}
        />

        <ErrorMessage error={error} bgColor="white"/>
        
        <button className="submit-auth-button" type="submit">Sign Up</button>
        
        <AuthCallToActionMsg 
        messageText="Already have an account?"
        linkText="Log In"
        link="/login"
        />
    </form>
</div>
  )
}
