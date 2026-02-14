import React from "react";

const Footer = () => {
  return (
    <footer className="footer-modern mt-5">

      <div className="container py-5">
        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-lg-4">
            <h4 className="fw-bold brand-logo">
              <i className="bi bi-briefcase-fill me-2"></i>HireX
            </h4>

            <p className="footer-text">
              Discover thousands of job opportunities and build your
              career faster with HireX.
            </p>

            <div className="social-icons">
              {["facebook", "twitter", "linkedin", "instagram"].map(i => (
                <a key={i} href="#">
                  <i className={`bi bi-${i}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="col-lg-2 col-md-6">
            <h6>Company</h6>
            <ul>
              <li>Home</li>
              <li>Browse Jobs</li>
              <li>Companies</li>
              <li>Career Tips</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6>Top Categories</h6>
            <ul>
              <li>Programming</li>
              <li>Design</li>
              <li>Marketing</li>
              <li>Cybersecurity</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-lg-3">
            <h6>Get in Touch</h6>
            <p>support@hirex.com</p>
            <p>Bangalore, India</p>

            <div className="app-mini-btns">
              <button className="btn btn-light btn-sm">
                <i className="bi bi-google-play"></i>
              </button>
              <button className="btn btn-light btn-sm">
                <i className="bi bi-apple"></i>
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom mt-4 pt-3">
          © {new Date().getFullYear()} HireX — All rights reserved
        </div>
      </div>

      {/* SCROLL BUTTON */}
      <button
        className="scroll-top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        ↑
      </button>

      <style>{`
        .footer-modern{
          background:#0f172a;
          color:#cbd5e1;
          position:relative;
        }

        .brand-logo{
          color:white;
        }

        .footer-text{
          color:#94a3b8;
          max-width:320px;
        }

        .footer-modern h6{
          color:white;
          margin-bottom:15px;
        }

        .footer-modern ul{
          list-style:none;
          padding:0;
        }

        .footer-modern li{
          margin-bottom:8px;
          color:#94a3b8;
          cursor:pointer;
          transition:.3s;
        }

        .footer-modern li:hover{
          color:white;
          transform:translateX(5px);
        }

        .social-icons a{
          margin-right:12px;
          font-size:20px;
          color:#94a3b8;
          transition:.3s;
        }

        .social-icons a:hover{
          color:white;
          transform:translateY(-3px);
        }

        .footer-bottom{
          border-top:1px solid #1e293b;
          text-align:center;
          color:#64748b;
        }

        .scroll-top{
          position:fixed;
          bottom:20px;
          right:20px;
          background:#0d6efd;
          color:white;
          border:none;
          border-radius:50%;
          width:45px;
          height:45px;
          font-size:18px;
          box-shadow:0 10px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
