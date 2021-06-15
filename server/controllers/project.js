const PublishModel = require("../models/Publish");

module.exports = {
  fetchProjects: async (req, res) => {
    const { latitude, longitude } = req.body.location;
    const limit = req.params.limit;

    try {
      const result = await PublishModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            distanceField: "distance",
            maxDistance: req.body.distance,
            spherical: true,
            query: { "location.type": "Point" },
          },
        },
        {
          $match: {
            hide: false,
            didCompleted: false,
          },
        },
        {
          $skip: limit - 5,
        },
        {
          $limit: parseInt(limit),
        },
        {
          $sort: { distance: -1 }, // Sort the nearest first
        },
      ]);

      res.status(200).json({ projects: result });
    } catch (error) {
      console.log(error);
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  fetchProjectDetails: async (req, res) => {
    try {
      const result = await PublishModel.findById(req.params.projectId);

      res.status(200).json({ details: result });
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  fetchAllProjects: async (req, res) => {
    const limit = req.params.limit;

    try {
      const result = await PublishModel.aggregate([
        {
          $match: {
            hide: false,
            didCompleted: false,
          },
        },
        {
          $skip: limit - 5,
        },
        {
          $limit: parseInt(limit),
        },
      ]);

      res.status(200).json({ projects: result });
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  hideProject: async (req, res) => {
    try {
      const result = await PublishModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            hide: true,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json("Something went wrong");
    }
  },
  showProject: async (req, res) => {
    try {
      const result = await PublishModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            hide: false,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json("Something went wrong");
    }
  },
  completedProject: async (req, res) => {
    try {
      const result = await PublishModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            didCompleted: true,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json("Something went wrong");
    }
  },
};
