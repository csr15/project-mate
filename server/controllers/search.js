//Models
const PublishModel = require("../models/Publish");

module.exports = {
  search: async (req, res) => {
    try {
      const searchResult = await PublishModel.find({
        programmingLanguage: {
          $in: req.params.searchValue,
        },
      });

      res.status(200).json(searchResult);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
};
