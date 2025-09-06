import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./not-found.css"


export default function NotFound() {
    const navigate = useNavigate();

    function navToDashboard() {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            navigate("/dashboard")
        } else {
            navigate("/login")
        }
    }

  return (
    <div className="not-found-page-container">
      <p className="text-404">404</p>
      <p className="subtitle-404">Page Not Found</p>
      <p className="subline-404">The page you are looking for does not exist</p>
      <div className="buttons-container-404">
        <button onClick={() => navigate("/")} className="button-404">Go To Home Page</button>
        <button onClick={navToDashboard} className="button-404 dashboard-404-btn">Go To Your Dashboard</button>
      </div>
    </div>
  )
}
