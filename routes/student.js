const express = require("express");
const router = express.Router();
const studentController= require("../controller/student");
const isAdmin = require("../middleware/isAdmin");
const isTeacher= require("../middleware/isTeacher");

// GET for front page
router.get("/attendence", studentController.getAttendence);

router.post("/attendence", studentController.postAttendence);

module.exports = router;