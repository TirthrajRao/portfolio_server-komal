const express = require("express");

const router = express.Router();


// Services
const ApiAuthService = require("../services/ApiAuth");

// Controllers
const TechnologyController = require("../controller/TechnologyController");

router.post("/", TechnologyController.createTechnology);
router.get("/", TechnologyController.getAllTechnology);
router.get("/:technologyId",TechnologyController.getTechnologyById)
router.put("/:technologyId",TechnologyController.updateTechnology);
router.delete("/:technologyId",TechnologyController.deleteTechnology);

module.exports = router;
