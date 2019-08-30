const express = require("express");

const router = express.Router();

// Controllers
const HashtagController = require("../controller/HashtagController");

router.post("/", HashtagController.createHashtag);
router.get("/", HashtagController.getAllHashTag);

module.exports = router;