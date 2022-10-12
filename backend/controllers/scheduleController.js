const asyncHandler = require("express-async-handler");
const WorkoutSchedule = require("../models/scheduleModel");
const Customer = require("../models/customerModel");

const getWorkoutSchedules = asyncHandler(async (req, res) => {
	const workoutSchedule = await WorkoutSchedule.find();
	res.json(workoutSchedule);
});

const getWorkoutScheduleId = asyncHandler(async (req, res) => {
	const workoutSchedule = await WorkoutSchedule.findById(req.params.id);

	if (workoutSchedule) {
		res.json(workoutSchedule);
	} else {
		res.status(404).json({ message: "Workout Schedule not found" });
	}
});

const createWorkoutSchedule = asyncHandler(async (req, res) => {
	const { ScheduleID, nic, PreWorkout, MainWorkout, PostWorkout } = req.body;
	const customer = await Customer.findOne({ nic: nic });
	const workoutSchedule = await WorkoutSchedule.findOne({ nic: nic });

	if (!ScheduleID || !nic || !PreWorkout || !MainWorkout || !PostWorkout) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else if (customer != null && workoutSchedule == null) {
		const workoutSchedule = new WorkoutSchedule({
			ScheduleID,
			nic,
			PreWorkout,
			MainWorkout,
			PostWorkout,
		});
		const createWorkoutSchedule = await workoutSchedule.save();
		res.status(201).json(createWorkoutSchedule);
	} else if (workoutSchedule != null) {
		res.status(404);
		throw new Error("workoutSchedule Plan Exists");
	} else {
		res.status(404);
		throw new Error("Not a registered customer");
	}
});
const updateWorkoutSchedule = asyncHandler(async (req, res) => {
	const { nic, PreWorkout, MainWorkout, PostWorkout } = req.body;

	const workoutSchedule = await WorkoutSchedule.findById(req.params.id);

	if (workoutSchedule) {
		workoutSchedule.nic = nic;
		workoutSchedule.PreWorkout = PreWorkout;
		workoutSchedule.MainWorkout = MainWorkout;
		workoutSchedule.PostWorkout = PostWorkout;

		const updateWorkoutSchedule = await workoutSchedule.save();
		res.json(updateWorkoutSchedule);
	} else {
		res.status(404);
		throw new Error("Workout Schedule is not found");
	}
});

const deleteWorkoutSchedule = asyncHandler(async (req, res) => {
	const workoutSchedule = await WorkoutSchedule.findById(req.params.id);

	if (workoutSchedule) {
		await workoutSchedule.remove();
		res.json({ message: "Workout Schedule  Removed" });
	} else {
		res.status(404);
		throw new Error("Workout Schedule  not Found");
	}
});

const getWorkoutScheduleForeachCustomer = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	const workoutSchedule = await WorkoutSchedule.findOne({ nic: customer.nic });
	if (workoutSchedule != null) {
		res.json(workoutSchedule);
	} else if (workoutSchedule == null) {
		res.status(404);
		throw new Error("You don't have any workout schedule yet");
	}
});
module.exports = {
	getWorkoutSchedules,
	createWorkoutSchedule,
	getWorkoutScheduleId,
	updateWorkoutSchedule,
	deleteWorkoutSchedule,
	getWorkoutScheduleForeachCustomer,
};
