const express = require("express");

const router = express.Router();

// Services
const ApiAuthService = require("../services/ApiAuth");

// Controllers
const ContactController = require("../controller/ContactController");

router.post("/", ContactController.createContact);
router.get("/", ContactController.getAllContactRequest)

module.exports = router;
