import React, { useState } from "react";

const PostJob = () => {

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) =>
    setSkills(skills.filter((s) => s !== skill));

  return (
    <div className="premium-post-job">

      {/* BACKGROUND ORBS */}
      <div className="bg-orb orb1"></div>
      <div className="bg-orb orb2"></div>

      <div className="container py-5">
        <div className="row g-4">

          {/* ================= LEFT FORM ================= */}
          <div className="col-lg-8">

            <div className="glass-card p-4">

              <h3 className="fw-bold mb-1">
                Create Job Listing ✨
              </h3>
              <p className="text-muted mb-4">
                Reach thousands of candidates instantly.
              </p>

              {/* BASIC INFO */}
              <div className="form-section">
                <h6 className="section-label">Basic Information</h6>

                <input
                  className="premium-input"
                  placeholder="Job Title (Frontend Developer)"
                />

                <div className="grid-2">
                  <input
                    className="premium-input"
                    placeholder="Company Name"
                  />

                  <input
                    className="premium-input"
                    placeholder="Location / Remote"
                  />
                </div>
              </div>

              {/* SALARY */}
              <div className="form-section">
                <h6 className="section-label">Salary Range</h6>

                <div className="grid-2">
                  <input
                    type="number"
                    className="premium-input"
                    placeholder="Min Salary"
                  />

                  <input
                    type="number"
                    className="premium-input"
                    placeholder="Max Salary"
                  />
                </div>
              </div>

              {/* SKILLS */}
              <div className="form-section">
                <h6 className="section-label">Required Skills</h6>

                <input
                  className="premium-input"
                  placeholder="Type skill & press Enter"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                />

                <div className="skills-area">
                  {skills.map((skill, i) => (
                    <div key={i} className="skill-chip">
                      {skill}
                      <span onClick={() => removeSkill(skill)}>×</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="form-section">
                <h6 className="section-label">Job Description</h6>

                <textarea
                  rows="6"
                  className="premium-input textarea"
                  placeholder="Explain responsibilities, requirements, expectations..."
                />
              </div>

              <button className="publish-btn">
                🚀 Publish Job
              </button>

            </div>
          </div>

          {/* ================= RIGHT AI PANEL ================= */}
          <div className="col-lg-4">

            <div className="ai-helper">

              <h5>🤖 HireX AI Assistant</h5>

              <ul>
                <li>✔ Better job titles attract 40% more applicants</li>
                <li>✔ Add 5–8 skills for ATS optimization</li>
                <li>✔ Salary transparency increases trust</li>
                <li>✔ Clear descriptions improve matching</li>
              </ul>

              <div className="preview-box">
                <h6>Live Preview</h6>
                <p className="small text-muted">
                  Your job post preview appears here.
                </p>

                <div className="preview-card-mini">
                  <h6>Frontend Developer</h6>
                  <span>HireX • Remote</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PostJob;
