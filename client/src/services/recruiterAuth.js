// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// // ================= REGISTER =================
// export const recruiterRegister = async (formData) => {
//   const res = await axios.post(`${API}/auth/register`, {
//     name: formData.name,
//     email: formData.email,
//     password: formData.password,
//     isAdmin: true, // recruiter flag
//   });

//   localStorage.setItem("recruiter", JSON.stringify(res.data));
//   return res.data;
// };

// // ================= LOGIN =================
// export const recruiterLogin = async (formData) => {
//   const res = await axios.post(`${API}/auth/login`, formData);

//   localStorage.setItem("recruiter", JSON.stringify(res.data));
//   return res.data;
// };

// // ================= LOGOUT =================
// export const recruiterLogout = () => {
//   localStorage.removeItem("recruiter");
// };

// // ================= GET TOKEN =================
// export const getRecruiterToken = () => {
//   const recruiter = JSON.parse(localStorage.getItem("recruiter"));
//   return recruiter?.token;
// };
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ================= REGISTER =================
export const recruiterRegister = async (formData) => {
  const res = await axios.post(`${API}/auth/register`, {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    isAdmin: true,
  });

  // Store separately
  localStorage.setItem("recruiterToken", res.data.token);
  localStorage.setItem("recruiterData", JSON.stringify(res.data.user));

  return res.data;
};

// ================= LOGIN =================
export const recruiterLogin = async (formData) => {
  const res = await axios.post(`${API}/auth/login`, formData);

  localStorage.setItem("recruiterToken", res.data.token);
  localStorage.setItem("recruiterData", JSON.stringify(res.data.user));

  return res.data;
};

// ================= LOGOUT =================
export const recruiterLogout = () => {
  localStorage.removeItem("recruiterToken");
  localStorage.removeItem("recruiterData");
};

// ================= GET TOKEN =================
export const getRecruiterToken = () => {
  return localStorage.getItem("recruiterToken");
};