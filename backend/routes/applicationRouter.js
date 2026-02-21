
const express = require('express');
const router = express.Router();

const {
  applyJob,
  getApplications,
  myApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authmiddleware');
const { uploadResume } = require('../middleware/uploadMiddleware');

/* ================================
   CANDIDATE (CLERK USER)
================================ */

// ✅ Apply job (NO JWT)
router.post(
  '/',
  uploadResume.single('resume'),
  applyJob
);

// ✅ Candidate dashboard
router.get(
  '/my/:clerkUserId',
  myApplications
);



// ✅ Accept / Reject
router.patch(
  '/:id/status',
  protect,
  updateApplicationStatus
);

module.exports = router;
