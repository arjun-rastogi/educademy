const express = require("express");
const { register, login } = require("../controller/userController");
const router = express.Router();

// Register API for creating user
router.post("/register", register);

// Login API for validating user
router.post("/login", login);

module.exports = router;
