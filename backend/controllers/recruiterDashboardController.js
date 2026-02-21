const Job = require('../Models/job');
const Application = require('../Models/Application');

const recruiterDashboard = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    // 1️⃣ Recruiter Jobs
    const jobs = await Job.find({ postedBy: recruiterId }).select('_id');

    const jobIds = jobs.map(job => job._id);

    // 2️⃣ Applications for recruiter jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    });

    // 3️⃣ Aggregations
    const totalJobs = jobIds.length;
    const totalApplications = applications.length;

    const accepted = applications.filter(a => a.status === 'Accepted').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    const pending = applications.filter(a => a.status === 'Pending').length;

    // 4️⃣ Average ATS
    const avgAtsScore =
      applications.length > 0
        ? Math.round(
            applications.reduce((sum, a) => sum + (a.atsScore || 0), 0) /
              applications.length
          )
        : 0;

    // 5️⃣ Recent applicants (last 5)
    const recentApplicants = await Application.find({
      job: { $in: jobIds },
    })
      .populate('job', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalJobs,
      totalApplications,
      accepted,
      rejected,
      pending,
      avgAtsScore,
      recentApplicants,
    });
  } catch (error) {
    console.error('DASHBOARD ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { recruiterDashboard };
