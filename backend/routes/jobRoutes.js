const express = require('express');
const router = express.Router();

const { getJobs, createJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authmiddleware');
const { uploadLogo } = require('../middleware/uploadMiddleware');

// GET jobs
router.get('/', getJobs);

// POST job WITH logo upload
router.post('/', protect, uploadLogo.single('logo'), createJob);
// router.post(
//   '/',
//   protect,
//   (req, res, next) => {
//     console.log('➡️ BEFORE uploadLogo middleware');
//     next();
//   },
//   uploadLogo.single('logo'),
//   (req, res, next) => {
//     console.log('➡️ AFTER uploadLogo middleware');
//     next();
//   },
//   createJob
// );


module.exports = router;
