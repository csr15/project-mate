//Models
const UserModel = require("../models/user");
const PublishModel = require("../models/Publish");
const RequestModel = require("../models/Request");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  userDetails: async (req, res) => {
    try {
      const data = await Promise.all([
        UserModel.findById(req.params.uid),
        PublishModel.find({ uid: req.params.uid }),
      ]);

      res.status(200).json({
        userDetails: data[0],
        userProjects: data[1],
      });
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  collaboratedProjects: async (req, res) => {
    try {
      const collaboratedProjects = await RequestModel.find({
        requestedUserId: req.params.uid,
      });

      res.status(200).json({ collaboratedProjects });
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  requestedUserDetails: async (req, res) => {
    try {
      const userDetails = await UserModel.aggregate([
        { $match: { _id: ObjectId(req.params.uid) } },
        {
          $project: {
            _id: {
              $toString: "$_id",
            },
            userName: "$userName",
            sureName: "$sureName",
            mail: "$mail:",
          },
        },
        {
          $lookup: {
            from: "publishes",
            localField: "_id",
            foreignField: "collaborators",
            as: "collaboratedProjects",
          },
        },
        {
          $lookup: {
            from: "publishes",
            localField: "_id",
            foreignField: "uid",
            as: "projectsPublished",
          },
        },
        {
          $project: {
            userDetails: {
              userName: "$userName",
              sureName: "$sureName",
              mail: "$mail",
            },
            collaboratedProjects: {
              $size: "$collaboratedProjects",
            },
            projectsPublished: {
              $size: "$projectsPublished",
            },
          },
        },
      ]);

      res.status(200).json(userDetails);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
};
