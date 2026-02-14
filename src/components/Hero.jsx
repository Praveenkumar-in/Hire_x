import React from "react";

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

        {/* Popular Tags */}
        <p className="popular-tags">
          Popular: Developer • Designer • Remote • Marketing
        </p>

      </div>
    </section>
  );
};

export default Hero;
