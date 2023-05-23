const express = require("express");
const router = express.Router();
const marksController= require("../controller/marks");
const isAdmin = require("../middleware/isAdmin");
const isTeacher= require("../middleware/isTeacher");

// GET for front page
router.get("/marks", marksController.getMarks);

router.post("/marks", marksController.postMarks);

router.delete("/marks/:id", marksController.deleteMarks);

module.exports = router;