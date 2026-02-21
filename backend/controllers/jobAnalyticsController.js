const Application = require('../Models/Application');
const Job = require('../Models/job');

const getJobAnalytics = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 🔐 ownership check
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ job: jobId });

    const totalApplications = applications.length;
    const accepted = applications.filter(a => a.status === 'Accepted').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    const pending = applications.filter(a => a.status === 'Pending').length;

    const avgAtsScore =
      totalApplications > 0
        ? Math.round(
            applications.reduce((sum, a) => sum + (a.atsScore || 0), 0) /
              totalApplications
          )
        : 0;

    res.json({
      jobTitle: job.title,
      totalApplications,
      accepted,
      rejected,
      pending,
      avgAtsScore,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJobAnalytics };
