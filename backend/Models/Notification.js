const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userClerkId: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['Application', 'StatusUpdate'],
      default: 'Application',
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema);
