//Models
const RequestModel = require("../models/Request");
const PublishModel = require("../models/Publish");

module.exports = {
  request: async (req, res) => {
    try {
      const newRequest = new RequestModel(req.body.data);

      await Promise.all([
        newRequest.save(),
        PublishModel.findByIdAndUpdate(
          req.params.projectId,
          {
            $addToSet: {
              collaborationRequestedUsers: req.body.data.requestedUserId,
            },
          },
          { new: true }
        ),
      ]);

      res.status(200).json("Request sent");
    } catch (error) {
      console.log(error);
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  acceptRequest: async (req, res) => {
    console.log(req.params);
    try {
      const data = await Promise.all([
        RequestModel.findByIdAndUpdate(req.params.id, {
          $set: {
            status: "granted",
          },
        }),
        PublishModel.findByIdAndUpdate(req.params.projectId, {
          $addToSet: {
            collaborators: req.params.requestedUserId,
          },
        }),
        PublishModel.findByIdAndUpdate(req.params.projectId, {
          $pull: {
            collaborationRequestedUsers: req.params.requestedUserId,
          },
        }),
        PublishModel.findByIdAndUpdate(req.params.projectId, {
          $addToSet: {
            developers: {
              name: req.params.requesterUserName,
              role: "To be assigned",
            },
          },
        }),
      ]);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json("Something went wrong, Please try again");
    }
  },

  denyRequest: async (req, res) => {
    try {
      const data = await RequestModel.findByIdAndUpdate(req.params.id, {
        $set: {
          status: "denied",
        },
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  deleteRequest: async (req, res) => {
    try {
      const data = await RequestModel.findByIdAndDelete(req.params.id);

      await Promise.all([
        PublishModel.findByIdAndUpdate(req.params.projectId, {
          $pull: {
            collaborationRequestedUsers: req.params.requestedUserId,
          },
        }),
        RequestModel.findByIdAndDelete(req.params.id),
      ]);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
};
