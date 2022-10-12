const express = require("express");
const {
	registerTrainer,
	authTrainer,
	getTrainerProfile,
	updateTrainerProfile,
	deleteTrainerProfile,
} = require("../controllers/trainerController");
const { getCustomers, getCustomerProfileById } = require("../controllers/customerController");
const {
	getNutritionPlans,
	getNutritionPlanById,
	createNutritionPlan,
	updateNutritionPlan,
	deleteNutritionPlan,
} = require("../controllers/nutritionPlanController");
const { getFaqsForTrainer, updateFaqForTrainer, getFaqById } = require("../controllers/faqController");
const {
	createTrainerLeave,
	getTrainerLeaveById,
	updateTrainerLeave,
	deleteTrainerLeave,
	getTrainerLeaveForEachTrainer,
} = require("../controllers/leaveController");

//route for schedule
const {
	getWorkoutSchedules,
	createWorkoutSchedule,
	getWorkoutScheduleId,
	updateWorkoutSchedule,
	deleteWorkoutSchedule,
} = require("../controllers/scheduleController");

//route for workout handle
const {
	getWorkoutHandling,
	createWorkoutHandling,
	getWorkoutHandlingId,
	updateWorkoutHandling,
	deleteWorkoutHandling,
} = require("../controllers/workoutController");

const { protect } = require("../middleware/authTrainerMiddleware");
const router = express.Router();

//Routes for Trainer Account Operations
router.route("/register").post(registerTrainer);
router.route("/login").post(authTrainer);
router.route("/view").get(protect, getTrainerProfile);
router.route("/edit").put(protect, updateTrainerProfile);
router.route("/delete").delete(protect, deleteTrainerProfile);

//Routes for Customer account operations by trainer
router.route("/customers").get(protect, getCustomers);
router.route("/customer/profile/view/:_id").get(protect, getCustomerProfileById);

//Routes for Trainer nutrition plan operations
router.route("/nutrition_plan/get").get(protect, getNutritionPlans);
router.route("/nutrition_plan/create").post(protect, createNutritionPlan);
router
	.route("/nutrition_plan/get/:id")
	.get(protect, getNutritionPlanById)
	.put(protect, updateNutritionPlan)
	.delete(protect, deleteNutritionPlan);

// Routes for Trainer faq operations
router.route("/faq/get").get(protect, getFaqsForTrainer);
router.route("/faq/get/:id").get(protect, getFaqById).put(protect, updateFaqForTrainer);

//Routes for Trainer leave management by trainer
router.route("/personal/trainer_leave/create").post(protect, createTrainerLeave);
router.route("/personal/trainer_leaves/:id").get(protect, getTrainerLeaveForEachTrainer);
router
	.route("/personal/trainer_leave/:id")
	.get(protect, getTrainerLeaveById)
	.put(protect, updateTrainerLeave)
	.delete(protect, deleteTrainerLeave);

// Routes for Workout trainer to handle workout
router.route("/workout/get").get(protect, getWorkoutHandling);
router.route("/workout/create").post(protect, createWorkoutHandling);
router
	.route("/workout/get/:id")
	.get(protect, getWorkoutHandlingId)
	.put(protect, updateWorkoutHandling)
	.delete(protect, deleteWorkoutHandling);
// Routes for Trainer workout schedule mangement
router.route("/schedule/get").get(protect, getWorkoutSchedules);
router.route("/schedule/create").post(protect, createWorkoutSchedule);
router
	.route("/schedule/get/:id")
	.get(protect, getWorkoutScheduleId)
	.put(protect, updateWorkoutSchedule)
	.delete(protect, deleteWorkoutSchedule);

module.exports = router;
