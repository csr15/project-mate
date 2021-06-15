const router = require("express").Router();

const notification = require("../controllers/notification");

//To fetch all notifications for current user
router.get("/:uid", notification.notificationHandler);

module.exports = router;
