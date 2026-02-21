const Application = require('../Models/Application');
const Job = require('../Models/job');

const getRecruiterApplications = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // filters
    const status = req.query.status;
    const sort = req.query.sort;

    // 1️⃣ Get recruiter job IDs
    const jobs = await Job.find({ postedBy: recruiterId }).select('_id');
    const jobIds = jobs.map(job => job._id);

    // 2️⃣ Build query
    const query = {
      job: { $in: jobIds },
    };

    if (status) {
      query.status = status;
    }

    // 3️⃣ Sorting
    let sortOption = { createdAt: -1 }; // latest
    if (sort === 'ats') {
      sortOption = { atsScore: -1 };
    }

    // 4️⃣ Fetch applications
    const applications = await Application.find(query)
      .populate('job', 'title')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments(query);

    res.json({
      totalApplications: total,
      page,
      pages: Math.ceil(total / limit),
      applications,
    });
  } catch (error) {
    console.error('RECRUITER APPLICATIONS ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecruiterApplications };
