const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const PublishSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    programmingLanguage: [String],
    location: {
      type: {
        type: String,
      },
      coordinates: [Number, Number],
    },
    developers: [
      {
        name: String,
        role: String,
      },
    ],
    imageURL: {
      type: String,
      default: "",
    },
    githubURL: {
      type: String,
      default: "",
    },
    previewURL: {
      type: String,
      default: "",
    },
    uid: String,
    userName: String,
    avatar: {
      type: String,
      default: "",
    },
    didCompleted: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    collaborators: {
      type: [String],
      default: [],
    },
    collaborationRequestedUsers: {
      type: [String],
      default: [],
    },
    role: String
  },
  {
    timestamps: true,
  }
);

PublishSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Publish", PublishSchema);
