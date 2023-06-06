const express = require("express");
const router = express.Router();
const marksController= require("../controller/marks");
const isAdmin = require("../middleware/isAdmin");
const isTeacher= require("../middleware/isTeacher");
const { check } = require("../middleware/jwtAuth");

// GET for front page
router.get("/marks", check, marksController.getMarks);

// get marks for user
router.get("/marks/:id", check , marksController.getMarksById);

router.post("/marks", isTeacher, marksController.postMarks);
router.post("/marks/:id", isTeacher, marksController.updateMarks);

router.delete("/marks/:id", check , isAdmin, marksController.deleteMarks);

router.get("/getmarks/:id" , check, marksController.getUserMarks);

module.exports = router;