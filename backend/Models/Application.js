const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicantName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'], // ✅ FIX
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
