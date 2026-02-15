
const express = require('express');
const router = express.Router();

const {
  applyJob,
  getApplications,
} = require('../controllers/applicationController');

const { protect } = require('../middleware/authmiddleware');
const { uploadResume } = require('../middleware/uploadMiddleware');

router.get('/', protect, getApplications);

router.post(
  '/',
  protect,
  uploadResume.single('resume'),
  applyJob
);

module.exports = router;
