const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const isAdmin = require("../middleware/isAdmin");
const isTeacher= require("../middleware/isTeacher");
const { check , signToken} = require("../middleware/jwtAuth");

// GET for front page
router.get("/user", check, userController.getUser);

// register user    
router.post("/user", userController.postUser);

router.post("/login", signToken, userController.postLogin);
router.get("/logout", check, userController.getLogout);


module.exports = router;