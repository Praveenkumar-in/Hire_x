
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { getRecruiterToken } from "../../services/recruiterAuth";
// import "./PostJob.css";
// import Select from "react-select";
// const API_URL = import.meta.env.VITE_API_URL;

// const categoriesList = [
//   "Programming",
//   "Data Science",
//   "Designing",
//   "Networking",
//   "Management",
//   "Marketing",
//   "Cybersecurity",
// ];

// const PostJob = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     level: "",
//     category: "",
//     salary: "",
//     description: "",
//     companyName: "",
//     companyEmail: "",
//   });

//   const [requirements, setRequirements] = useState([]);
//   const [requirementInput, setRequirementInput] = useState("");
//   const [logo, setLogo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const addRequirement = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const trimmed = requirementInput.trim();
//       if (!trimmed) return;

//       if (requirements.includes(trimmed)) {
//         toast.info("Requirement already added");
//         return;
//       }

//       setRequirements([...requirements, trimmed]);
//       setRequirementInput("");
//     }
//   };

//   const removeRequirement = (item) =>
//     setRequirements(requirements.filter((r) => r !== item));

//   const validateForm = () => {
//     if (!formData.title) return toast.error("Job title required");
//     if (!formData.companyName) return toast.error("Company name required");
//     if (!formData.companyEmail) return toast.error("Company email required");
//     if (!formData.location) return toast.error("Location required");
//     if (!formData.level) return toast.error("Select job level");
//     if (!formData.category) return toast.error("Select category");
//     if (!formData.salary) return toast.error("Salary required");
//     if (!formData.description) return toast.error("Description required");
//     if (requirements.length === 0)
//       return toast.error("Add at least one requirement");
//     if (!logo) return toast.error("Upload company logo");

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const token = getRecruiterToken();

//       const data = new FormData();

//       data.append("title", formData.title);
//       data.append("location", formData.location);
//       data.append("level", formData.level);
//       data.append("category", formData.category);
//       data.append("salary", formData.salary);
//       data.append("description", formData.description);
//       data.append("requirements", requirements.join(","));
//       data.append("companyName", formData.companyName);
//       data.append("companyEmail", formData.companyEmail);
//       data.append("companyLogo", logo);

//       await axios.post(`${API_URL}/jobs`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success("Job Published Successfully 🚀");

//       setFormData({
//         title: "",
//         location: "",
//         level: "",
//         category: "",
//         salary: "",
//         description: "",
//         companyName: "",
//         companyEmail: "",
//       });

//       setRequirements([]);
//       setLogo(null);

//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed ❌");
//     }

//     setLoading(false);
//   };
//   const customSelectStyles = {
//   control: (base, state) => ({
//     ...base,
//     background: "linear-gradient(145deg, #1e293b, #0f172a)",
//     border: state.isFocused
//       ? "1px solid #00f5ff"
//       : "1px solid #334155",
//     boxShadow: state.isFocused
//       ? "0 0 0 2px rgba(0,245,255,0.3)"
//       : "none",
//     borderRadius: "14px",
//     padding: "4px",
//     color: "white",
//   }),

//   menu: (base) => ({
//     ...base,
//     background: "#0f172a",
//     borderRadius: "14px",
//     padding: "5px",
//   }),

//   option: (base, state) => ({
//     ...base,
//     background: state.isFocused
//       ? "linear-gradient(90deg,#00f5ff,#00d4ff)"
//       : "transparent",
//     color: state.isFocused ? "#000" : "white",
//     borderRadius: "8px",
//     cursor: "pointer",
//   }),

//   singleValue: (base) => ({
//     ...base,
//     color: "white",
//   }),

//   placeholder: (base) => ({
//     ...base,
//     color: "#94a3b8",
//   }),

//   dropdownIndicator: (base) => ({
//     ...base,
//     color: "#00f5ff",
//   }),

//   indicatorSeparator: () => ({
//     display: "none",
//   }),
// };
//   return (
//     <div className="postjob-container">
//       <div className="postjob-card">
//         <h2>Create New Job ✨</h2>

//         <div className="form-grid">

//           <input name="title" placeholder="Job Title" onChange={handleChange} />
//           <input name="location" placeholder="Location" onChange={handleChange} />

//           {/* LEVEL SELECT */}
//           <Select
//             options={[
//               { value: "Beginner Level", label: "Beginner Level" },
//               { value: "Intermediate Level", label: "Intermediate Level" },
//               { value: "Senior Level", label: "Senior Level" }
//             ]}
//             placeholder="Select Level"
//             onChange={(selected) =>
//               setFormData({ ...formData, level: selected.value })
//             }
//             styles={customSelectStyles}
//           />

//           {/* CATEGORY SELECT */}
//           <Select
//             options={categoriesList.map((cat) => ({
//               value: cat,
//               label: cat,
//             }))}
//             placeholder="Select Category"
//             onChange={(selected) =>
//               setFormData({ ...formData, category: selected.value })
//             }
//             styles={customSelectStyles}
//           />

//           <input type="number" name="salary" placeholder="Salary" onChange={handleChange} />

//           <input
//             type="file"
//             className="file-input"
//             onChange={(e) => setLogo(e.target.files[0])}
//           />

//           <input name="companyName" placeholder="Company Name" onChange={handleChange} />
//           <input name="companyEmail" placeholder="Company Email" onChange={handleChange} />

//         </div>

//         <textarea
//           name="description"
//           placeholder="Job Description"
//           onChange={handleChange}
//         />

//         <div className="requirements-section">
//           <h4>Job Requirements (Press Enter to Add)</h4>
//           <input
//             placeholder="Add requirement"
//             value={requirementInput}
//             onChange={(e) => setRequirementInput(e.target.value)}
//             onKeyDown={addRequirement}
//           />

//           <div className="requirements-box">
//             {requirements.map((item, i) => (
//               <span key={i} className="req-chip">
//                 {item}
//                 <button onClick={() => removeRequirement(item)}>×</button>
//               </span>
//             ))}
//           </div>
//         </div>

//         <button
//           className="publish-btn"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Publishing..." : "🚀 Publish Job"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostJob;


import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getRecruiterToken } from "../../services/recruiterAuth";
import "./PostJob.css";
import Select from "react-select";

const API_URL = import.meta.env.VITE_API_URL;

const categoriesList = [
  "Programming",
  "Data Science",
  "Designing",
  "Networking",
  "Management",
  "Marketing",
  "Cybersecurity",
];

const PostJob = () => {

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    level: "",
    category: "",
    salary: "",
    description: "",
    companyName: "",
    companyEmail: "",
  });

  const [requirements, setRequirements] = useState([]);
  const [requirementInput, setRequirementInput] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileKey, setFileKey] = useState(Date.now());

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addRequirement = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = requirementInput.trim();
      if (!trimmed) return;

      if (requirements.includes(trimmed)) {
        toast.info("Requirement already added");
        return;
      }

      setRequirements([...requirements, trimmed]);
      setRequirementInput("");
    }
  };

  const removeRequirement = (item) =>
    setRequirements(requirements.filter((r) => r !== item));

  const validateForm = () => {
    if (!formData.title) return toast.error("Job title required");
    if (!formData.companyName) return toast.error("Company name required");
    if (!formData.companyEmail) return toast.error("Company email required");
    if (!formData.location) return toast.error("Location required");
    if (!formData.level) return toast.error("Select job level");
    if (!formData.category) return toast.error("Select category");
    if (!formData.salary) return toast.error("Salary required");
    if (!formData.description) return toast.error("Description required");
    if (requirements.length === 0)
      return toast.error("Add at least one requirement");
    if (!logo) return toast.error("Upload company logo");

    return true;
  };

  const handleSubmit = async () => {

    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = getRecruiterToken();

      const data = new FormData();

      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("level", formData.level);
      data.append("category", formData.category);
      data.append("salary", formData.salary);
      data.append("description", formData.description);
      data.append("requirements", requirements.join(","));
      data.append("companyName", formData.companyName);
      data.append("companyEmail", formData.companyEmail);
      data.append("companyLogo", logo);

      await axios.post(`${API_URL}/jobs`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job Published Successfully 🚀");

      setFormData({
        title: "",
        location: "",
        level: "",
        category: "",
        salary: "",
        description: "",
        companyName: "",
        companyEmail: "",
      });

      setRequirements([]);
      setLogo(null);
      setFileKey(Date.now());

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed ❌");
    }

    setLoading(false);
  };

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: "linear-gradient(145deg, #1e293b, #0f172a)",
      border: state.isFocused
        ? "1px solid #00f5ff"
        : "1px solid #334155",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(0,245,255,0.3)"
        : "none",
      borderRadius: "14px",
      padding: "4px",
      color: "white",
    }),

    menu: (base) => ({
      ...base,
      background: "#0f172a",
      borderRadius: "14px",
      padding: "5px",
    }),

    option: (base, state) => ({
      ...base,
      background: state.isFocused
        ? "linear-gradient(90deg,#00f5ff,#00d4ff)"
        : "transparent",
      color: state.isFocused ? "#000" : "white",
      borderRadius: "8px",
      cursor: "pointer",
    }),

    singleValue: (base) => ({
      ...base,
      color: "white",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#00f5ff",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className="postjob-container">
      <div className="postjob-card">

        <h2>Create New Job ✨</h2>

        <div className="form-grid">

          <input
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          {/* LEVEL SELECT */}
          <Select
            options={[
              { value: "Beginner Level", label: "Beginner Level" },
              { value: "Intermediate Level", label: "Intermediate Level" },
              { value: "Senior Level", label: "Senior Level" }
            ]}
            placeholder="Select Level"
            value={
              formData.level
                ? { value: formData.level, label: formData.level }
                : null
            }
            onChange={(selected) =>
              setFormData({ ...formData, level: selected.value })
            }
            styles={customSelectStyles}
          />

          {/* CATEGORY SELECT */}
          <Select
            options={categoriesList.map((cat) => ({
              value: cat,
              label: cat,
            }))}
            placeholder="Select Category"
            value={
              formData.category
                ? { value: formData.category, label: formData.category }
                : null
            }
            onChange={(selected) =>
              setFormData({ ...formData, category: selected.value })
            }
            styles={customSelectStyles}
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
          />

          <input
            key={fileKey}
            type="file"
            className="file-input"
            onChange={(e) => setLogo(e.target.files[0])}
          />

          <input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
          />

          <input
            name="companyEmail"
            placeholder="Company Email"
            value={formData.companyEmail}
            onChange={handleChange}
          />

        </div>

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="requirements-section">

          <h4>Job Requirements (Press Enter to Add)</h4>

          <input
            placeholder="Add requirement"
            value={requirementInput}
            onChange={(e) => setRequirementInput(e.target.value)}
            onKeyDown={addRequirement}
          />

          <div className="requirements-box">

            {requirements.map((item, i) => (
              <span key={i} className="req-chip">
                {item}
                <button onClick={() => removeRequirement(item)}>×</button>
              </span>
            ))}

          </div>

        </div>

        <button
          className="publish-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Publishing..." : "🚀 Publish Job"}
        </button>

      </div>
    </div>
  );
};

export default PostJob;