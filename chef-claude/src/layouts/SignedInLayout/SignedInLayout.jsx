import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./layout.css"

export default function SignedInLayout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-main-content-container">
      <Outlet />
      </div> 
    </div>
  )
}
