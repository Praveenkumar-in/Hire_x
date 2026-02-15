const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  description: String,
  requirements: [String],
  companyLogo: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Job || mongoose.model('Job', jobSchema);
