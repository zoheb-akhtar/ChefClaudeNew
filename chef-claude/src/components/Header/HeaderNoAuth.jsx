import React from 'react'
import { Outlet } from 'react-router'
import HeaderLogo from './HeaderLogo/HeaderLogo'
import "./header.css"

export default function HeaderNoAuth() {
  return (
      <>
      <div className="header">
      <HeaderLogo />
      </div>
      <Outlet />
      </>
  )
}
