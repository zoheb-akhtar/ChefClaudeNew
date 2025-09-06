import React from 'react'
import "./error-message.css"

export default function ErrorMessage({error, bgColor}) {
  const bgStyle = {
    backgroundColor: bgColor
  } 

  return (
    <div style={bgStyle} className={`error-message-auth-container ${error ? "active" : ""}`}>
        <img src="/images/alert-circle.svg"></img>
        <p className="auth-error">{error}</p>
    </div>
  )
}
