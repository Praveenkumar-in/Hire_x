const mongoose = require("mongoose");

const clerkUserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: String,
    name: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ClerkUser ||
  mongoose.model("ClerkUser", clerkUserSchema);