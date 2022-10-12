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

const { getWorkoutScheduleForeachCustomer } = require("../controllers/scheduleController");
const { getWorkoutHandling } = require("../controllers/workoutController");
const { getTimeSpent, createTimeSpent } = require("../controllers/timeSpentController");

const { getProgress, createProgress } = require("../controllers/progressController");
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

// Routes for customer progress operations
router.route("/progress/get").get(protect, getProgress);
router.route("/progress/create").post(protect, createProgress);

// Route for customer workoutHandling
router.route("/workout/get").get(protect, getWorkoutHandling);

// Route for customer workout schedule
router.route("/schedule/:id").get(protect, getWorkoutScheduleForeachCustomer);

//Route for Time Spent
router.route("/time/get").get(protect, getTimeSpent);
router.route("/time/create").post(protect, createTimeSpent);

module.exports = router;
