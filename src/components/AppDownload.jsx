import React from "react";

import { assets } from "../assets/assets";
const AppDownload = () => {
  return (
    <section className="my-5">
      <div className="container">
        <div className="row align-items-center bg-light rounded-4 p-4 p-md-5 position-relative overflow-hidden">

          {/* LEFT CONTENT */}
          <div className="col-md-6 text-center text-md-start">
            <h3 className="fw-bold mb-3">
              Download mobile app for <br /> better experience
            </h3>

            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#">
                <img src={assets.play_store} alt="Google Play" height="45" />
              </a>
              <a href="#">
                <img src={assets.app_store} alt="App Store" height="45" />
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src={assets.app_main_img}
              alt="App download"
              className="img-fluid"
              style={{ maxHeight: "260px" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppDownload;