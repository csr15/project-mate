const router = require('express').Router();

const request = require('../controllers/request');

//Sending collaboration request
router.post("/:projectId", request.request)

//Sending collaboration request
router.patch("/accept_request/:id/:requestedUserId/:requesterUserName/:projectId", request.acceptRequest)

//Sending collaboration request
router.patch("/deny_request/:id", request.denyRequest)

//Sending collaboration request
router.delete("/delete_request/:id/:projectId/:requestedUserId", request.deleteRequest)

module.exports = router;