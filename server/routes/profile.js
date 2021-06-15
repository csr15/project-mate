const router = require("express").Router();

//Controllers for routers
const profile = require("../controllers/profile");

//Fetching user details
router.get("/:uid", profile.userDetails);

//Fetching collaborated projects of current user
router.get("/collaborated_projects/:uid", profile.collaboratedProjects);

//To fetch requested user details
router.get("/requested_user_details/:uid", profile.requestedUserDetails);

module.exports = router;
