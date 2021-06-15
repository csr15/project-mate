const RequestModel = require("../models/Request");

module.exports = {
  notificationHandler: async (req, res) => {
    try {
      const notifications = await RequestModel.find({
        publisherId: req.params.uid,
        status: "pending"
      });

      res.status(200).json(notifications);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
};
