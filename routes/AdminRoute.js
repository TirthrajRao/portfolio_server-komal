const express = require("express");

const router = express.Router();

// Controllers
const AdminLoginController = require("../controller/AdminLoginController");

router.post("/admin-login", AdminLoginController.login);
router.post("/",AdminLoginController.addAdmin)


module.exports = router;
