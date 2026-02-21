const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },

    applicantClerkId: {
      type: String,
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

    // ⭐ ATS
    atsScore: {
      type: Number,
      default: 0,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    feedback: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Application ||
  mongoose.model('Application', applicationSchema);
