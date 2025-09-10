import React, { useState } from 'react'
import "./sidebar.css"
import SidebarLink from './SidebarLink/SidebarLink'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import logout from '../../utils/logout'


export default function Sidebar({isOpen, setIsOpen}) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div>
      <img className="mobile-nav-close" src="/images/x.svg"onClick={() => setIsOpen(false)}></img>
      <Link className="sidebar-page-link" to="/dashboard">
      <div className="logo-container-sidebar">
        <img className="logo-sidebar" src="/images/chef-claude-icon.png"/>
        <p className="sidebar-title">Chef Claude</p>
      </div>
      </Link>
      
      <div className="page-link-container-sidebar">
        <SidebarLink 
        link="/dashboard"
        image="/images/bar-chart-2.svg"
        label="Dashboard"
        />
        <SidebarLink 
        link="/yourrecipes"
        image="/images/book-open.svg"
        label="Your Recipes"
        />
        <SidebarLink 
        link="/getrecipe"
        image="/images/zap.svg"
        label="Generate Recipes"
        />

      </div>
      </div>
      <div className="sidebar-bottom-container">
        <SidebarLink 
        link="/userprofile"
        image="/images/user.svg"
        label="Your Profile"
        />
        <div onClick={() => setShowModal(true)} className="logout-container">
        <img src="/images/log-out.svg"></img>
        <p>Logout</p>
        </div>

      </div>
      </div>
      {showModal && <Modal 
      setShowModal={setShowModal}
      clickFunction={() => logout(navigate)}
      message="Are your sure you want to logout?"
      ctaButtonMessage="Logout"
      />}
    </>
    
  )
}
