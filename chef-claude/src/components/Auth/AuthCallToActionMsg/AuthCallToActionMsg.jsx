import React from 'react'
import "./auth-cta.css"
import { Link } from 'react-router-dom'


export default function AuthCallToActionMsg({messageText, linkText, link}) {
  return (
     <div className="auth-message-container">
        <p className="auth-message">{messageText}</p>
        <Link to={link} className="auth-link">{linkText}</Link>
    </div>  
    
  )
}
