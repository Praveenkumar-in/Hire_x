const express = require('express');
const router = express.Router();
const { recruiterDashboard } = require('../controllers/recruiterDashboardController');
const { getJobs, createJob,deleteJob,getJobById } = require('../controllers/jobController');
const { protect } = require('../middleware/authmiddleware');
const { uploadLogo } = require('../middleware/uploadMiddleware');
const { updateJobStatus } = require('../controllers/jobController');

router.patch('/:id/status', protect, updateJobStatus);

// GET jobs
router.get('/', getJobs);

// POST job WITH logo upload
router.post('/', protect, uploadLogo.single('companyLogo'), createJob);

router.get("/:id", getJobById);
// DELETE job (Recruiter only)
router.delete(
  '/:id',
  protect,
  deleteJob
);
module.exports = router;
