import { Link, Outlet } from "react-router";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import "./header.css"

export default function Header() {
    return (
      <>
      <div className="header">
        <HeaderLogo />

        <div className="auth-button-container">
          <Link to="/login">
          <button className="sign-in-header-button">Log In</button>
          </Link>

          <Link to="/signup">
          <button className="sign-up-header-button">Sign Up</button>
          </Link>
          
        </div>
      </div>
      
      <Outlet />
      </>
        
    )
}