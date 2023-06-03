const router = require("express").Router();
const libraryController = require("../controller/library");
const isAdmin = require("../middleware/isAdmin");
const isTeacher = require("../middleware/isTeacher");
const { check } = require("../middleware/jwtAuth");

router.get("/library", check, libraryController.getLibrary);

router.get("/library/:id", check, libraryController.getOneLibrary);

router.post("/library", check, libraryController.postLibrary);

router.post("/library/issue/:id", check, libraryController.issueBook);

router.post("/library/return/:id", check, libraryController.returnBook);

router.delete("/library/:id", isAdmin, libraryController.deleteLibrary);

module.exports = router;