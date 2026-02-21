const express = require('express');
const router = express.Router();

const { adminLogin } = require('../controllers/adminAuthController');
const { adminProtect } = require('../middleware/adminAuthMiddleware');
const { getApplications } = require('../controllers/applicationController');

// login
router.post('/login', adminLogin);

// admin-only data
router.get('/applications', adminProtect, getApplications);

module.exports = router;
