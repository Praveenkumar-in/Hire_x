const express = require('express');
const router = express.Router();

const { recruiterDashboard } = require('../controllers/recruiterDashboardController');
const { protect } = require('../middleware/authmiddleware');
const {
  getRecruiterApplications,
} = require('../controllers/recruiterApplicationsController');
const { getRecruiterJobs } = require('../controllers/recruiterJobsController');
const { getJobAnalytics } = require('../controllers/jobAnalyticsController');
const { recruiterProtect } = require('../middleware/recruiterAuth');

router.get('/jobs', protect, getRecruiterJobs);
const { updateJobStatus } = require('../controllers/jobController');

router.patch('/:id/status', protect, updateJobStatus);
router.get('/jobs/:jobId/analytics', protect, getJobAnalytics);
router.get('/applications', protect, getRecruiterApplications);
router.get('/dashboard',protect, recruiterDashboard);

module.exports = router;
