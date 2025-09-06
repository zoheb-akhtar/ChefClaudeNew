import React from 'react'
import { NavLink } from 'react-router-dom'
import "./sidebar-link.css"

export default function SidebarLink({link, image, label}) {
  return (
    <NavLink to={link} className={({isActive}) => `sidebar-page-link${isActive ? "-active" : ""}`}>
        <div className="sidebar-page-link-container">
            <img className="sidebar-link-img" src={image} />
            <p className="sidebar-link-label">{label}</p>
        </div>
    </NavLink>
  )
}
