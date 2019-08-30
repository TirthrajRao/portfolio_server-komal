const express = require("express");

const router = express.Router();

// Services
const ApiAuthService = require("../services/ApiAuth");

// Controllers
const CategoryController = require("../controller/CategoriesController");

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategory);
router.get("/:categoryId", CategoryController.getSingleCategory);
router.delete("/:categoryId",CategoryController.deleteCategory);
router.put("/:categoryId",CategoryController.updateCategory);

module.exports = router;
