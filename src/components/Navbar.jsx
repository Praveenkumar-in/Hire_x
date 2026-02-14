import React from 'react'
import { assets } from '../assets/assets'
import {useClerk ,UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  
  const {openSignIn} = useClerk()
  const {user}=useUser()

  return (
    <nav className="navbar navbar-expand-lg hirex-navbar">
      <div className="container-fluid px-3">

         {/* Logo */}
        <a className="navbar-brand " href="#">
           <img src={assets.logo} alt="HireX" className="hirex-logo" />
         </a>
        
        {/* MOBILE TOGGLE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hirexNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSE AREA */}
        <div className="collapse navbar-collapse" id="hirexNavbar">

          {/* Right side buttons */}
          <div className="ms-auto d-flex gap-2 mt-3 mt-lg-0">
             <button onClick={ e => openSignIn()} className="btn hirex-login">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </button>

            <button className="btn hirex-recruiter">
              I'm Recruiter
            </button>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;