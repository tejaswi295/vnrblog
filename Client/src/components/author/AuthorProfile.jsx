import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './AuthorProfile.css'

function AuthorProfile() {
  return (
    <div className="author-profile">
      <nav className="nav-menu">
        <NavLink to="articles" className="nav-link">Articles</NavLink>
        <NavLink to="article" className="nav-link">Post Article</NavLink>
      </nav>
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorProfile