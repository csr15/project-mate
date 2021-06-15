const router = require("express").Router();

//Controllers for routers
const search = require("../controllers/search");

//To fetch specific project searched by the user
router.get("/:searchValue", search.search);

module.exports = router;
