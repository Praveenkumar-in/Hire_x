import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <section className="app-download-section my-5">
      <div className="container">
        <div className="app-download-card">

          <div className="row align-items-center">

            {/* LEFT */}
            <div className="col-lg-6 text-center text-lg-start">
              <span className="download-badge">🚀 Hire faster</span>

              <h2 className="fw-bold mt-3">
                Get the HireX Mobile App <br />
                <span className="gradient-text">
                  Apply jobs anytime
                </span>
              </h2>

              <p className="text-muted mt-3">
                Discover jobs, track applications and connect with companies
                directly from your phone.
              </p>

              <div className="d-flex gap-3 justify-content-center justify-content-lg-start mt-4">
                <img
                  src={assets.play_store}
                  alt="Google Play"
                  className="store-btn"
                />
                <img
                  src={assets.app_store}
                  alt="App Store"
                  className="store-btn"
                />
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <img
                src={assets.app_main_img}
                alt="App"
                className="img-fluid floating-img"
              />
            </div>

          </div>
        </div>
      </div>

      {/* STYLE */}
      <style>{`
        .app-download-card{
          background: linear-gradient(135deg,#f8fbff,#eef4ff);
          border-radius: 20px;
          padding: 50px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }

        .download-badge{
          background:#0d6efd15;
          color:#0d6efd;
          padding:6px 14px;
          border-radius:50px;
          font-size:14px;
          font-weight:600;
        }

        .gradient-text{
          background:linear-gradient(90deg,#0d6efd,#6f42c1);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .store-btn{
          height:48px;
          cursor:pointer;
          transition:.3s;
        }

        .store-btn:hover{
          transform:translateY(-4px) scale(1.05);
        }

        .floating-img{
          max-height:300px;
          animation:float 4s ease-in-out infinite;
        }

        @keyframes float{
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-12px)}
        }
      `}</style>
    </section>
  );
};

export default AppDownload;
