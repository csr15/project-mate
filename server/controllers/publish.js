//Models
const PublishModel = require("../models/Publish");

module.exports = {
  publishProject: async (req, res) => {
    try {
      const newProject = new PublishModel(req.body.data);

      await newProject.save();
      res.status(200).json("Published");
    } catch (error) {
      res
        .status(400)
        .json("Something went wrong, Please try again");
    }
  },
};
