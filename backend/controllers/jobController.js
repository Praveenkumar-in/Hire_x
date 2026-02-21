const Job = require('../Models/job');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createJob = async (req, res) => {
  try {
    console.log('🟢 Controller reached');
    console.log('🟢 req.body:', req.body);
    console.log('🟢 req.file:', req.file);
  const job = await Job.create({
      title: req.body.title,
      location: req.body.location,
      level: req.body.level,
      category: req.body.category,
      salary: req.body.salary,
      description: req.body.description,
      requirements: req.body.requirements
        ? req.body.requirements.split(',')
        : [],
      company: {
         name: req.body.companyName,
        email: req.body.companyEmail,
        logo: req.file ? req.file.path : null,
      },
      postedBy: req.user._id,
    });

    res.status(201).json(job);
    
 } catch (error) {
  console.error('CREATE JOB ERROR:', error.stack || error);
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
}


const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found in DB' });
    }

    console.log('JOB POSTED BY:', job.postedBy.toString());
    console.log('REQUEST USER:', req.user._id.toString());

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'You are not allowed to delete this job',
      });
    }

    await job.deleteOne();

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 🔐 ownership check
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    job.isActive = req.body.isActive;
    await job.save();

    res.json({
      message: `Job ${job.isActive ? 'reopened' : 'closed'} successfully`,
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getJobs, createJob ,deleteJob,updateJobStatus};
