const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const isStaff = require("../middleware/isStaff");
const { check , signToken} = require("../middleware/jwtAuth");

// GET for front page
router.get("/user",check,  userController.getUser);
router.get("/user/:id",check,  userController.getOneUser);
// register user    
router.post("/user", check,  userController.postUser);


router.post("/login",  signToken, userController.postLogin);
router.get("/logout", check , userController.getLogout);


module.exports = router;