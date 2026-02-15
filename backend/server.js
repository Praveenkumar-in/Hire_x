
// const express = require('express');
// const dotenv = require('dotenv');
// dotenv.config();
// const connectDB = require('./config/db');

// // Route imports
// const authRoutes = require('./routes/authRoutes');
// const jobRoutes = require('./routes/jobRoutes');
// const applicationRoutes = require('./routes/applicationRouter');



// // Connect to MongoDB
// connectDB();

// const app = express();

// // -------------------- MIDDLEWARE --------------------
// app.use(express.json()); // Parse JSON bodies

// // -------------------- ROUTES ------------------------
// app.use('/api/auth', authRoutes);            // ✅ AUTH ROUTES
// app.use('/api/jobs', jobRoutes);              // ✅ JOB ROUTES
// app.use('/api/applications', applicationRoutes); // ✅ APPLICATION ROUTES

// // -------------------- HEALTH CHECK ------------------
// app.get('/', (req, res) => {
//   res.send('HireX API is running 🚀');
// });

// // // -------------------- ERROR HANDLER -----------------
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({
// //     message: err.message || 'Server Error',
// //   });
// // });


// // -------------------- SERVER ------------------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );
const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');


// 🔥 LOAD ENV FIRST
dotenv.config();
 const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRouter');


connectDB();

const app = express();

app.use(express.json());
 app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
 );

// // ✅ Multer error handler
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     console.error('🟥 MULTER ERROR:', err);
//     return res.status(400).json({
//       message: err.message,
//       code: err.code,
//     });
//   }

//   next(err);
// });


// // -------------------- ERROR HANDLER -----------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Server Error',
  });
});
console.log(process.env.CLOUDINARY_CLOUD_NAME);
