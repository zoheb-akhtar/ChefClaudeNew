import React, { useState } from 'react'
import "./auth-input.css"

export default function AuthInput({divClassName, 
                                    label, 
                                    value, 
                                    onChange, 
                                    inputClassName, 
                                    placeholder,
                                    type,
                                    showPassword,
                                    setShowPassword,
                                    includeVisToggle}) {                           
                                      
  return (
    <div className={divClassName}>
        <div className="auth-input-img-container">
        <p className="auth-input-label">{label}</p>
        {includeVisToggle && <img onClick={() => setShowPassword(prevShow => !prevShow)} className="show-password-icon" src={showPassword ? "/images/eye-off.svg" : "/images/eye.svg"}></img>}
        </div>
        <input required value={value} onChange={onChange} className={inputClassName} type={type} placeholder={placeholder}/>
        
    </div>
  )
}
