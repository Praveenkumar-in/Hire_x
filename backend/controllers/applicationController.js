const Application = require('../models/Application');

// Apply to a job
const applyJob = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    const application = await Application.create({
      job: req.body.job,
      applicantName: req.body.applicantName,
      email: req.body.email,
      resumeLink: req.file.path,
      status: 'Pending',
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('job');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyJob, getApplications };
