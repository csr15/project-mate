const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  sureName: String,
  mail: { type: String, unique: true },
  password: String,
  github: { type: String, default: "" },
  facebook: { type: String, default: "" },
  link: { type: String, default: "" },
  description: { type: String, default: "" },
  avatar: { type: String, default: "" },
  skills: { type: [String], default: [] },
  collaboration: { type: [String], default: [] },
});

module.exports = mongoose.model("User", userSchema);
