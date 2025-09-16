import React from 'react'
import "./loader.css"

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-spinner"></div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  )
}