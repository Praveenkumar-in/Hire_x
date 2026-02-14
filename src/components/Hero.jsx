import React from "react";
import { assets } from "../assets/assets";
const Hero = () => {
    return (
        <section className="hirex-hero d-flex align-items-center">
            <div className="container text-center">

                {/* Heading */}
                <h1 className="hero-title">
                    Find Your <span>Dream Job</span> Today 🚀
                </h1>

                <p className="hero-subtitle">
                    Discover thousands of jobs from top companies around the world
                </p>

                {/* Search Box */}
                <div className="hirex-search-box mx-auto">

                    {/* Job Search */}
                    <div className="search-field">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            placeholder="Job title, keyword or company"
                        />
                    </div>

                    {/* Location */}
                    <div className="search-field">
                        <i className="bi bi-geo-alt"></i>
                        <input
                            type="text"
                            placeholder="Location"
                        />
                    </div>

                    {/* Search Button */}
                    <button className="btn hirex-search-btn">
                        <i className="bi bi-arrow-right-circle me-2"></i>
                        Search
                    </button>

                </div>

                {/* ===== TRUSTED BY ===== */}
                <div className="trusted-section">


                    <div className="trusted-heading">
                        <span>Trusted by 5,000+ companies worldwide</span>
                    </div>


                    <div className="logo-slider">

                        <div className="logo-track">
                            {/* logos duplicated for infinite scroll */}
                            <img src={assets.microsoft_logo} alt="Microsoft" />
                            <img src={assets.walmart_logo} alt="Walmart" />
                            <img src={assets.accenture_logo} alt="Accenture" />
                            <img src={assets.amazon_logo} alt="Amazon" />
                            <img src={assets.samsung_logo} alt="Samsung" />

                            {/* duplicate again */}
                            <img src={assets.microsoft_logo} alt="Microsoft" />
                            <img src={assets.walmart_logo} alt="Walmart" />
                            <img src={assets.accenture_logo} alt="Accenture" />
                            <img src={assets.amazon_logo} alt="Amazon" />
                            <img src={assets.samsung_logo} alt="Samsung" />
                        </div>

                    </div>

                </div>


            </div>
        </section>
    );
};

export default Hero;
