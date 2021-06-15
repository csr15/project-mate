const {
  fetchProjects,
  fetchProjectDetails,
  fetchAllProjects,
  hideProject,
  showProject,
  completedProject,
  testProjects,
} = require("../controllers/project");

const router = require("express").Router();

//To fetch nearby project with specified distance
router.post("/fetch_projects_near/:limit", fetchProjects);

//About selected project
router.get("/project_details/:projectId", fetchProjectDetails);

//To fetch all projects 
router.get("/all_projects/:limit", fetchAllProjects);

//To hide a user published project
router.patch("/hide_project/:id", hideProject);

//To reset the hide project of user published project
router.patch("/show_project/:id", showProject);

//To set a project as a completed project
router.patch("/complete_project/:id", completedProject);

module.exports = router;
