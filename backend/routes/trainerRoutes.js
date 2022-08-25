const express = require("express");
const {
	registerTrainer,
	authTrainer,
	getTrainerProfile,
	updateTrainerProfile,
	deleteTrainerProfile,
} = require("../controllers/trainerController");
const { getCustomers, getCustomerProfileById } = require("../controllers/customerController");

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

// Routes for Workout trainer to handle workout
router.route("workouthandle/get").get(protect, getWorkoutHandling);
router.route("workouthandle/create").post(protect, createWorkoutHandling);
router
	.route("workouthandle/get/:id")
	.get(protect, getWorkoutHandlingId)
	.put(protect, updateWorkoutHandling)
	.delete(protect, deleteWorkoutHandling);

module.exports = router;
