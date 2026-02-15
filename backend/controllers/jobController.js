const Job = require('../Models/Job');

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
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
      requirements: req.body.requirements?.split(','),
      companyLogo: req.file ? req.file.path : null,
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


module.exports = { getJobs, createJob };
