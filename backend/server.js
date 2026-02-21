// const cors = require("cors");

// const express = require('express');
// const dotenv = require('dotenv');
// const multer = require('multer');



// // 🔥 LOAD ENV FIRST
// dotenv.config();
//  const authRoutes = require('./routes/authRoutes');
// const connectDB = require('./config/db');
// const jobRoutes = require('./routes/jobRoutes');
// const applicationRoutes = require('./routes/applicationRouter');
// const recruiterRoutes = require('./routes/recruiterRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
// const chatRoutes = require("./routes/chatRoutes");


// const adminRoutes = require('./routes/adminRoutes');

// connectDB();

// const app = express();
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
// app.use(express.json());
//  app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes);
// app.use('/api/recruiter', recruiterRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/notifications', notificationRoutes);

// app.use("/api", chatRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
//  );


// // // -------------------- ERROR HANDLER -----------------
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: err.message || 'Server Error',
//   });
// });
// console.log(process.env.CLOUDINARY_CLOUD_NAME);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRouter");
const recruiterRoutes = require("./routes/recruiterRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");

connectDB();

const app = express();

/* CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hire-x.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api", chatRoutes);

/* ROOT ROUTE */
app.get("/", (req, res) => {
  res.send("🚀 HireX Backend Running");
});

/* ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

module.exports = app;