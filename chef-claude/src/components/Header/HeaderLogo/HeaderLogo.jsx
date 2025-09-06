import React from 'react'
import { Link } from 'react-router'
import "./header-logo.css"

export default function HeaderLogo() {
  return (
    <Link className="logo-link" to="/">
        <div className="logo-container">
        <img className="logo" src="/images/chef-claude-icon.png"></img>
        <p className="header-title">Chef Claude</p>
        </div>
    </Link>
  )
}
