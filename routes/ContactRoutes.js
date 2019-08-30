const express = require("express");

const router = express.Router();

// Services
const ApiAuthService = require("../services/ApiAuth");

// Controllers
const ContactController = require("../controller/ContactController");

router.post("/", ContactController.createContact);

module.exports = router;
