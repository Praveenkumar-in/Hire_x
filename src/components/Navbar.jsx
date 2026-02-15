
import React from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

import { Link, NavLink } from "react-router-dom";
const Navbar = () => {

  // Clerk hooks
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <nav className="navbar navbar-expand-lg hirex-navbar">
      <div className="container-fluid px-3">

        {/* ===== LOGO ===== */}
        <a className="navbar-brand" href="#">
          <img
            src={assets.logo}
            alt="HireX"
            className="hirex-logo"
          />
        </a>

        {/* ===== MOBILE TOGGLE ===== */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hirexNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ===== COLLAPSE AREA ===== */}
        <div className="collapse navbar-collapse" id="hirexNavbar">

          {/* ===== RIGHT SIDE ===== */}
          <div className="ms-auto d-flex gap-2 mt-3 mt-lg-0 align-items-center">

            {user ? (
              <>
                {/* Recruiter Button */}
                <button className="btn hirex-recruiter">
                  I'm Recruiter
                </button>

                {/* Clerk User Profile */}
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={() => openSignIn()}
                  className="btn hirex-login"
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </button>

 <Link to ="/recruiter/login"> <button className="btn hirex-recruiter">
                  I'm Recruiter
                </button></Link>  
               

              </>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
