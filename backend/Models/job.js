
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ['Beginner Level', 'Intermediate Level', 'Senior Level'],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    // ✅ COMPANY INFO (matches frontend)
    company: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      logo: {
        type: String, // Cloudinary URL
      },
    },

    description: {
      type: String, // HTML string
      required: true,
    },

    // ✅ Used for ATS
    requirements: {
      type: [String],
      default: [],
    },

    // recruiter reference
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
      // 🔥 NEW
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports =
  mongoose.models.Job || mongoose.model('Job', jobSchema);
