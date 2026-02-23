const express = require('express');
const router = express.Router();
const { deleteJob } = require('../controllers/jobController');
const { adminLogin } = require('../controllers/adminAuthController');
const { adminProtect } = require('../middleware/adminAuthMiddleware');
const { getApplications } = require('../controllers/applicationController');

// login
router.post('/login', adminLogin);

// admin-only data
router.get('/applications', adminProtect, getApplications);
//
router.delete(
  '/:id',
  adminProtect,
  deleteJob
);
module.exports = router;
