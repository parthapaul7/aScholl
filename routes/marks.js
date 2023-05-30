const express = require("express");
const router = express.Router();
const marksController= require("../controller/marks");
const isAdmin = require("../middleware/isAdmin");
const isTeacher= require("../middleware/isTeacher");
const { check } = require("../middleware/jwtAuth");

// GET for front page
router.get("/marks", check, marksController.getMarks);

// get marks for user
router.get("/marks/:id", check , marksController.getUserMarks);

router.post("/marks",check, marksController.postMarks);

router.delete("/marks/:id", isAdmin, marksController.deleteMarks);

module.exports = router;