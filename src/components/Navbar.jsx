import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    
    <nav className="navbar navbar-expand-lg hirex-navbar px-4">
      <div className="container-fluid">

        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={assets.logo} alt="HireX" className="hirex-logo" />
        </a>

        {/* Right Buttons */}
        <div className="d-flex gap-2">
          <button className="btn hirex-login"><i className="bi bi-box-arrow-in-right me-2"></i>Login</button>
          <button className="btn hirex-recruiter">I'm Recruiter</button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar


