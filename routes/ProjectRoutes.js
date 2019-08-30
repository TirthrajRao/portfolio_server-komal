const express = require("express");

const router = express.Router();

// Services
const ApiAuthService = require("../services/ApiAuth");

// Controllers
const ProjectController = require("../controller/ProjectController");

router.post("/", ProjectController.createProject);
router.get("/", ProjectController.getProjectsByCategory);
router.get("/all", ProjectController.getAllProjects);
router.post("/search-projects", ProjectController.getFilteredProjects);
router.get("/:projectId", ProjectController.getSingleProject);
router.put("/:projectId",ProjectController.updateProject);
router.delete("/:projectId",ProjectController.deleteProject)

module.exports = router;
