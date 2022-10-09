const express = require("express");
const { registerAdmin, authAdmin, getAdminProfile, updateAdminProfile } = require("../controllers/adminController");
const {
	registerTrainer,
	getTrainerProfileById,
	deleteTrainerProfileById,
	updateTrainerProfileById,
	getTrainers,
} = require("../controllers/trainerController");
const {
	getCustomers,
	updateCustomerProfileById,
	deleteCustomerProfileById,
	getCustomerProfileById,
	registerCustomer,
	getCustomerCount,
} = require("../controllers/customerController");
const { getNutritionPlans } = require("../controllers/nutritionPlanController");
const { getNotes, createNote, getNoteById, updateNote, deleteNote } = require("../controllers/noteController");
const { getTrainerLeaves, approveTrainerLeaveByAdmin, getTrainerLeaveById } = require("../controllers/leaveController");
const { protect } = require("../middleware/authAdminMiddleware");
const router = express.Router();

//Routes for Admin Account Operations
router.route("/register").post(registerAdmin);
router.route("/login").post(authAdmin);
router.route("/view").get(protect, getAdminProfile);
router.route("/edit").put(protect, updateAdminProfile);

//Routes for Trainer account operations admin end
router.route("/trainer/register").post(protect, registerTrainer);
router
	.route("/trainer/profile/view/:_id")
	.get(protect, getTrainerProfileById)
	.delete(protect, deleteTrainerProfileById);
router.route("/trainer/profile/edit/:_id").put(protect, updateTrainerProfileById);
router.route("/trainers").get(protect, getTrainers);

//Routes for Customer account operations admin end
router.route("/customer/register").post(protect, registerCustomer);
router
	.route("/customer/profile/view/:_id")
	.get(protect, getCustomerProfileById)
	.delete(protect, deleteCustomerProfileById);
router.route("/customer/profile/edit/:_id").put(protect, updateCustomerProfileById);
router.route("/customers").get(protect, getCustomers);
router.route("/customers/count").get(protect, getCustomerCount);

//Routes for admin nutrition plan operations
router.route("/nutrition_plan/get").get(protect, getNutritionPlans);

//Routes for admin to create notes
router.route("/notes").get(protect, getNotes);
router.route("/notes/create").post(protect, createNote);
router.route("/notes/:id").get(getNoteById).put(protect, updateNote).delete(protect, deleteNote);

//Routes for Trainer leave management admin end
router.route("/trainer/trainer_leaves").get(protect, getTrainerLeaves);
router
	.route("/trainer/trainer_leaves/approve/:id")
	.put(protect, approveTrainerLeaveByAdmin)
	.get(protect, getTrainerLeaveById);

module.exports = router;
