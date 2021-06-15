const router = require("express").Router();

//Controllers for routers
const auth = require("../controllers/auth");

//Checking username is available or not
router.post("/username_validation", auth.userNameValidation);

//Checking mail ID is available or not
router.post("/mail_validation", auth.mailValidation);

//Signup
router.post("/signup", auth.signup);

//Signin
router.post("/signin", auth.signin);

//Signin
router.post("/google_oauth", auth.googleAuth);

module.exports = router;
