
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { JobCategories, JobLocations } from "../assets/assets";

const JobListing = () => {
  const {
    searchFilter,
    categoryFilter,
    setCategoryFilter,
    locationFilter,
    setLocationFilter,
    jobs
  } = useContext(AppContext);

  /* ================= MOBILE FILTER STATE ================= */
  const [showFilters, setShowFilters] = useState(false);

  /* ================= PAGINATION STATE ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  /* ================= FILTER LOGIC ================= */
  const toggleCategory = (cat) => {
    setCategoryFilter(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );

    if (window.innerWidth < 992) setShowFilters(false);
  };

  const toggleLocation = (loc) => {
    setLocationFilter(prev =>
      prev.includes(loc)
        ? prev.filter(l => l !== loc)
        : [...prev, loc]
    );

    if (window.innerWidth < 992) setShowFilters(false);
  };

  /* ================= FILTERED JOBS ================= */
  const filteredJobs = (jobs || []).filter((job) => {
    const matchTitle = job.title.toLowerCase()
      .includes(searchFilter.title.toLowerCase());

    const matchLocation = job.location.toLowerCase()
      .includes(searchFilter.location.toLowerCase());

    const matchCategory = categoryFilter.length === 0 ||
      categoryFilter.includes(job.category);

    const matchSidebarLocation = locationFilter.length === 0 ||
      locationFilter.includes(job.location);

    return matchTitle && matchLocation && matchCategory && matchSidebarLocation;
  });

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  /* ================= REMOVE FILTER CHIP ================= */
  const removeCategoryChip = (cat) => {
    setCategoryFilter(prev => prev.filter(c => c !== cat));
  };

  const removeLocationChip = (loc) => {
    setLocationFilter(prev => prev.filter(l => l !== loc));
  };

  /* ================= ACTIVE FILTER COUNT ================= */
  const activeFilterCount = categoryFilter.length + locationFilter.length;

  /* ================= UI ================= */
  return (
    <div className="job-listing-section">
      <div className="container my-5">

        {/* ===== MOBILE FILTER BUTTON ===== */}
        <div className="d-lg-none mb-3">
          <button
            className="btn mobile-filter-btn w-100 d-flex justify-content-between align-items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>
              Filters
              {activeFilterCount > 0 && (
                <span className="filter-count ms-2">{activeFilterCount}</span>
              )}
            </span>
            <i className={`bi bi-chevron-down filter-arrow ${showFilters ? "rotate" : ""}`}></i>
          </button>
        </div>

        <div className="row">

          {/* ===== SIDEBAR ===== */}
          <div className={`col-lg-3 mb-4 ${showFilters ? "mobile-filter-open" : "mobile-filter-close"} d-lg-block`}>
            <div className="job-sidebar p-3">

              <h5 className="mb-3">Search by Category</h5>
              {JobCategories.map((cat, i) => (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={categoryFilter.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <label className="form-check-label">{cat}</label>
                </div>
              ))}

              <hr />

              <h5 className="mb-3">Search by Location</h5>
              {JobLocations.map((loc, i) => (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={locationFilter.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                  />
                  <label className="form-check-label">{loc}</label>
                </div>
              ))}

            </div>
          </div>

          {/* ===== JOB LIST ===== */}
          <div className="col-lg-9">

            {/* ===== ACTIVE FILTER CHIPS ===== */}
            {activeFilterCount > 0 && (
              <div className="mb-3 d-flex flex-wrap gap-2">
                {categoryFilter.map((cat) => (
                  <span className="badge bg-primary filter-chip" key={cat}>
                    {cat} <i className="bi bi-x" onClick={() => removeCategoryChip(cat)}></i>
                  </span>
                ))}
                {locationFilter.map((loc) => (
                  <span className="badge bg-success filter-chip" key={loc}>
                    {loc} <i className="bi bi-x" onClick={() => removeLocationChip(loc)}></i>
                  </span>
                ))}
              </div>
            )}

            <div className="row g-4">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <div className="col-md-6 col-xl-4" key={job._id}>
                    <div className="card job-card h-100">

                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="text-muted mb-2">
                          <i className="bi bi-geo-alt me-1"></i>
                          {job.location}
                        </p>
                        <div className="d-flex gap-2 mt-2 flex-wrap">
                          <span className="badge bg-danger-subtle text-danger">{job.level}</span>
                          <span className="badge bg-primary-subtle text-primary">{job.category}</span>
                        </div>
                        <div
                          className="small mt-3 text-secondary"
                          dangerouslySetInnerHTML={{ __html: job.description.slice(0, 80) }}
                        />
                      </div>

                      <div className="card-footer bg-transparent border-0">
                        <div className="d-flex gap-2">
                          <button className="btn btn-outline-primary w-50">Learn More</button>
                          <button className="btn btn-primary w-50">Apply Now</button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))
              ) : (
                <h5>No Jobs Found</h5>
              )}
            </div>

            {/* ===== PAGINATION ===== */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

 export default JobListing;