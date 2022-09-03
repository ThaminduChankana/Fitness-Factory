const express = require("express");
const {
	registerCustomer,
	authCustomer,
	getCustomerProfile,
	updateCustomerProfile,
	deleteCustomerProfile,
} = require("../controllers/customerController");
const { getNutririonPlanForeachCustomer } = require("../controllers/nutritionPlanController");
const { protect } = require("../middleware/authCustomerMiddleware");
const router = express.Router();

//Routes for Customer Account Operations
router.route("/register").post(registerCustomer);
router.route("/login").post(authCustomer);
router.route("/view").get(protect, getCustomerProfile);
router.route("/edit").put(protect, updateCustomerProfile);
router.route("/delete").delete(protect, deleteCustomerProfile);

// Routes for a customer nutrition plan operations
router.route("/nutrition_plan/:id").get(protect, getNutririonPlanForeachCustomer);

module.exports = router;
