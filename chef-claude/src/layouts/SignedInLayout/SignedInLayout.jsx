import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./layout.css"

export default function SignedInLayout() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="layout-container">
      {!isOpen && <img onClick={() => setIsOpen(true)} className="mobile-show-nav" src="/images/sidebar.svg"></img>}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="layout-main-content-container">
      <Outlet />
      </div> 
    </div>
  )
}
