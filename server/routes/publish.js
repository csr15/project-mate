const router = require("express").Router();

//Controllers for routers
const publish = require("../controllers/publish");

//To publish a new project
router.post("/:uid", publish.publishProject);

module.exports = router;
