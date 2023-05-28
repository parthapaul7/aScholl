const express = require("express");
const router = express.Router();
const amountController= require("../controller/amount");
const isAdmin = require("../middleware/isAdmin");
const isStaff = require("../middleware/isStaff");
const { check } = require("../middleware/jwtAuth");

// GET for front page
router.get("/amount", isStaff, amountController.getAmount);

router.get("/amount/:id", check , amountController.getUserAmount);

router.post("/amount", isStaff, amountController.postAmount);

// update amount
router.put("/amount/:id", amountController.updateAmount);

router.delete("/amount/:id", amountController.deleteAmount);


module.exports = router;