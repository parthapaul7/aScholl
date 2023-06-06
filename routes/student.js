const express = require("express");
const router = express.Router();
const studentController= require("../controller/student");
const isAdmin = require("../middleware/isAdmin");
const isTeacher= require("../middleware/isTeacher");
const { check } = require("../middleware/jwtAuth");

// GET for front page
router.get("/attendance", check ,isTeacher, studentController.getAttendance);

router.post("/attendance", check, isTeacher, studentController.postAttendance);

router.delete("/attendance/:id",check, isTeacher, studentController.deleteAttendance);

module.exports = router;