const mongoose = require("mongoose");

const clerkUserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: String,
    imageUrl: String,
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ClerkUser ||
  mongoose.model("ClerkUser", clerkUserSchema);