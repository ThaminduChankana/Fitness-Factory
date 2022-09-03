const express = require("express");
const {
	registerCustomer,
	authCustomer,
	getCustomerProfile,
	updateCustomerProfile,
	deleteCustomerProfile,
} = require("../controllers/customerController");
const { getNutririonPlanForeachCustomer } = require("../controllers/nutritionPlanController");
const { getFaqs, getFaqById, deleteFaq, createFaq, updateFaq } = require("../controllers/faqController");
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

// Routes for customer faq operations
router.route("/faq/get").get(protect, getFaqs);
router.route("/faq/create").post(protect, createFaq);
router.route("/faq/get/:id").get(protect, getFaqById).put(protect, updateFaq).delete(protect, deleteFaq);

module.exports = router;
