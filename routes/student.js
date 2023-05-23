const express = require("express");
const router = express.Router();
const studentController= require("../controller/student");
const isAdmin = require("../middleware/isAdmin");
const isTeacher= require("../middleware/isTeacher");

// GET for front page
router.get("/attendance", isTeacher, studentController.getAttendance);

router.post("/attendance", isTeacher, studentController.postAttendance);

router.delete("/attendance/:id", studentController.deleteAttendance);

module.exports = router;