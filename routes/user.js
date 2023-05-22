const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const isAdmin = require("../middleware/isAdmin");
const isTeacher= require("../middleware/isTeacher");
// const { check } = require("../middleware/jwtAuth");

// GET for front page
router.get("/user", userController.getUser);

router.post("/user", userController.postUser);


module.exports = router;