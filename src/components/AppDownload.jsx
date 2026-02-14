

import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <section className="app-download">
      <div className="container">

        <div className="app-download-wrapper row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 text-center text-lg-start">

            <span className="app-badge">
              Mobile Experience
            </span>

            <h2 className="app-title mt-3">
              Find Jobs Faster <br />
              with the <span>HireX App</span>
            </h2>

            <p className="app-desc">
              Search jobs, apply instantly, track applications and
              connect with recruiters anywhere, anytime.
            </p>

            <div className="app-store-buttons">
              <img src={assets.play_store} alt="Play Store" />
              <img src={assets.app_store} alt="App Store" />
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <div className="app-image-box">
              <img
                src={assets.app_main_img}
                alt="App"
                className="img-fluid"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AppDownload;
