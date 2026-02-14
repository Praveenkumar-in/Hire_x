
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { JobCategories, JobLocations } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobListing = () => {

    const {
        searchFilter,
        categoryFilter,
        setCategoryFilter,
        locationFilter,
        setLocationFilter,
        jobs
    } = useContext(AppContext);
    
const navigate = useNavigate();


const handleApply = (id) => {
  if (typeof id === "object") {
   
    return;
  }

  navigate(`/apply-job/${id}`);
};


    /* ================= STATES ================= */
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;

    /* ================= FILTER TOGGLE ================= */

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

    /* ================= CLEAR ALL FILTERS ================= */

    const clearAllFilters = () => {
        setCategoryFilter([]);
        setLocationFilter([]);
        setCurrentPage(1);

        if (window.innerWidth < 992) setShowFilters(false);
    };

    /* ================= FILTERED JOBS ================= */

    const filteredJobs = (jobs || []).filter((job) => {

        const matchTitle =
            job.title.toLowerCase()
                .includes(searchFilter.title.toLowerCase());

        const matchLocation =
            job.location.toLowerCase()
                .includes(searchFilter.location.toLowerCase());

        const matchCategory =
            categoryFilter.length === 0 ||
            categoryFilter.includes(job.category);

        const matchSidebarLocation =
            locationFilter.length === 0 ||
            locationFilter.includes(job.location);

        return (
            matchTitle &&
            matchLocation &&
            matchCategory &&
            matchSidebarLocation
        );
    });

    /* ✅ RESET PAGE WHEN FILTER CHANGES */
    useEffect(() => {
        setCurrentPage(1);
    }, [categoryFilter, locationFilter, searchFilter]);

    /* ================= PAGINATION ================= */

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    const handlePrev = () =>
        setCurrentPage(prev => Math.max(prev - 1, 1));

    const handleNext = () =>
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    /* ================= PAGE NUMBERS ================= */
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    /* ================= CHIP REMOVE ================= */

    const removeCategoryChip = (cat) => {
        setCategoryFilter(prev => prev.filter(c => c !== cat));
    };

    const removeLocationChip = (loc) => {
        setLocationFilter(prev => prev.filter(l => l !== loc));
    };

    const activeFilterCount =
        categoryFilter.length + locationFilter.length;
      
        

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
                                <span className="filter-count ms-2">
                                    {activeFilterCount}
                                </span>
                            )}
                        </span>

                        <i className={`bi bi-chevron-down filter-arrow ${showFilters ? "rotate" : ""}`}></i>
                    </button>
                </div>

                <div className="row">

                    {/* ===== SIDEBAR ===== */}
                    <div className={`col-lg-3 mb-4 ${showFilters ? "mobile-filter-open" : "mobile-filter-close"} d-lg-block`}>
                        <div className="job-sidebar p-3">

                            {/* HEADER */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">Filters</h5>

                                {activeFilterCount > 0 && (
                                    <button
                                        className="btn btn-sm btn-link text-danger p-0"
                                        onClick={clearAllFilters}
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <h6 className="mb-2">Search by Category</h6>

                            {JobCategories.map((cat, i) => (
                                <div className="form-check" key={i}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={categoryFilter.includes(cat)}
                                        onChange={() => toggleCategory(cat)}
                                    />
                                    <label className="form-check-label">
                                        {cat}
                                    </label>
                                </div>
                            ))}

                            <hr />

                            <h6 className="mb-2">Search by Location</h6>

                            {JobLocations.map((loc, i) => (
                                <div className="form-check" key={i}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={locationFilter.includes(loc)}
                                        onChange={() => toggleLocation(loc)}
                                    />
                                    <label className="form-check-label">
                                        {loc}
                                    </label>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* ===== JOB LIST ===== */}
                    <div className="col-lg-9">

                        {/* ===== FILTER CHIPS ===== */}
                        {activeFilterCount > 0 && (
                            <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">

                                {categoryFilter.map(cat => (
                                    <span key={cat} className="badge bg-primary filter-chip">
                                        {cat}
                                        <i
                                            className="bi bi-x ms-1"
                                            onClick={() => removeCategoryChip(cat)}
                                        ></i>
                                    </span>
                                ))}

                                {locationFilter.map(loc => (
                                    <span key={loc} className="badge bg-success filter-chip">
                                        {loc}
                                        <i
                                            className="bi bi-x ms-1"
                                            onClick={() => removeLocationChip(loc)}
                                        ></i>
                                    </span>
                                ))}

                                {/* CLEAR ALL (CHIP AREA) */}
                                <button
                                    className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={clearAllFilters}
                                >
                                    Clear All
                                </button>

                            </div>
                        )}

                        {/* ===== JOB CARDS ===== */}
                        <div onClick={handleApply} style={{ cursor: "pointer" }} className="row g-4">
                            {paginatedJobs.length > 0 ? (
                                paginatedJobs.map(job => (

                                    <div className="col-md-6 col-xl-4" key={job._id}>
                                        <div className="card job-card h-100">

                                            <div className="card-body">
                                                <h5 className="card-title">{job.title}</h5>

                                                <p className="text-muted mb-2">
                                                    <i className="bi bi-geo-alt me-1"></i>
                                                    {job.location}
                                                </p>

                                                <div className="d-flex gap-2 mt-2 flex-wrap">
                                                    <span className="badge bg-danger-subtle text-danger">
                                                        {job.level}
                                                    </span>

                                                    <span className="badge bg-primary-subtle text-primary">
                                                        {job.category}
                                                    </span>
                                                </div>

                                                <div
                                                    className="small mt-3 text-secondary"
                                                    dangerouslySetInnerHTML={{
                                                        __html: job.description.slice(0, 80)
                                                    }}
                                                />
                                            </div>

                                            <div className="card-footer bg-transparent border-0">
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-outline-primary w-50">
                                                        Learn More
                                                    </button>
                                                    <button className="btn btn-primary w-50"   onClick={() => handleApply(job._id)} >
                                                    
                                                        Apply Now
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                ))
                            ) : (
                                <h5>No Jobs Found</h5>
                            )}
                        </div>
                        {/* ===== PREMIUM PAGINATION ===== */}
                        {totalPages > 1 && (
                            <div className="pagination-wrapper mt-5">
                                <div className="d-flex justify-content-center flex-wrap gap-2">

                                    {pageNumbers.map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => goToPage(num)}
                                            className={`page-btn ${currentPage === num ? "active" : ""
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}

                                </div>
                            </div>
                        )}



                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListing;
