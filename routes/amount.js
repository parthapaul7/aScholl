const express = require("express");
const router = express.Router();
const amountController= require("../controller/amount");
const isAdmin = require("../middleware/isAdmin");
const isStaff = require("../middleware/isStaff");
const { check } = require("../middleware/jwtAuth");

// GET for front page
router.get("/amount", check, isStaff, amountController.getAmount);

// get info for a perticular user
router.get("/getamount/:id", check , amountController.getUserAmount);

router.post("/amount", check,isStaff, amountController.postAmount);

// update amount
router.post("/amount/:id", check, isStaff ,amountController.updateAmount);

router.delete("/amount/:id", check,isAdmin,amountController.deleteAmount);


// statement 
router.get("/statement",check,  amountController.getStatement);
router.get("/financial-statement",check,  amountController.getFinancialStatement);

module.exports = router;