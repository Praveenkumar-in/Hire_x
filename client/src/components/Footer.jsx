import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer-modern mt-5">

      <div className="container footer-container py-5">
        <div className="row gy-5">

          {/* BRAND */}
          <div className="col-lg-4">
            <h4 className="brand-logo">
              <i className="bi bi-briefcase-fill me-2"></i>
              HireX
            </h4>

            <p className="footer-text">
              Discover thousands of job opportunities and build your
              career faster with HireX platform.
            </p>

            <div className="social-icons mt-3">
              {["facebook", "twitter", "linkedin", "instagram"].map(i => (
                <a key={i} href="#">
                  <i className={`bi bi-${i}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-links">
              <li>Home</li>
              <li>Browse Jobs</li>
              <li>Companies</li>
              <li>Career Tips</li>
            </ul>
          </div>

          {/* CATEGORY */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Top Categories</h6>
            <ul className="footer-links">
              <li>Programming</li>
              <li>Design</li>
              <li>Marketing</li>
              <li>Cybersecurity</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-lg-3">
            <h6 className="footer-heading">Get in Touch</h6>

            <p className="footer-contact">
              <i className="bi bi-envelope me-2"></i>
              support@hirex.com
            </p>

            <p className="footer-contact">
              <i className="bi bi-geo-alt me-2"></i>
              Bangalore, India
            </p>

            <div className="app-mini-btns mt-3">
              <button className="store-btn">
                <i className="bi bi-google-play"></i>
              </button>
              <Link to ="/admin/login" className="store-btn">
                <i className="bi bi-apple"></i>
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom mt-5 pt-4">
          © {new Date().getFullYear()} HireX — All rights reserved
        </div>
      </div>

      {/* SCROLL TOP */}
      <button
        className="scroll-top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <i className="bi bi-arrow-up"></i>
      </button>

    </footer>
  );
};

export default Footer;
