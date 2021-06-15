const mongoose = require("mongoose");
const { Timestamp } = require("bson");

const RequestSchema = mongoose.Schema(
  {
    publisherId: String,
    publisherName: String,
    projectTitle: String,
    requestedUserId: String,
    requesterUserName: String,
    projectId: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", RequestSchema);
