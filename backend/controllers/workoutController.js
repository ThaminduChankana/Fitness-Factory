const WorkoutHandling = require("../models/workoutModel");
const asyncHandler = require("express-async-handler");

const getWorkoutHandling = asyncHandler(async (req, res) => {
	const workout = await WorkoutHandling.find();
	res.json(workout);
});

const createWorkoutHandling = asyncHandler(async (req, res) => {
	const { workoutID, name, workoutCategory, instructions, repetitions, tips } = req.body;
	// const workoutExists = await WorkoutHandling.findOne({ workoutID });
	if (!workoutID || !name || !workoutCategory || !instructions || !repetitions || !tips) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const workout = new WorkoutHandling({
			workoutID,
			name,
			workoutCategory,
			instructions,
			repetitions,
			tips,
		});
		const createWorkoutHandling = await workout.save();
		res.status(201).json(createWorkoutHandling);
	}
});

const getWorkoutHandlingId = asyncHandler(async (req, res) => {
	const workouthandling = await WorkoutHandling.findById(req.params.id);

	if (workouthandling) {
		res.json(workouthandling);
	} else {
		res.status(404).json({ message: "Workout not found" });
	}
});

const updateWorkoutHandling = asyncHandler(async (req, res) => {
	const { workoutID, name, workoutCategory, instructions, repetitions, tips } = req.body;

	const workout = await WorkoutHandling.findById(req.params.id);
	if (workout) {
		workout.workoutID = workoutID;
		workout.name = name;
		workout.workoutCategory = workoutCategory;
		workout.instructions = instructions;
		workout.repetitions = repetitions;
		workout.tips = tips;

		const updateWorkoutHandling = await workout.save();
		res.json(updateWorkoutHandling);
	} else {
		res.status(404);
		throw new Error("Workout not found");
	}
});

const deleteWorkoutHandling = asyncHandler(async (req, res) => {
	const workout = await WorkoutHandling.findById(req.params.id);

	if (workout) {
		await workout.remove();
		res.json({ message: "Workout is Removed" });
	} else {
		res.status(404);
		throw new Error("Workout Remove is Failed");
	}
});

module.exports = {
	getWorkoutHandling,
	createWorkoutHandling,
	getWorkoutHandlingId,
	updateWorkoutHandling,
	deleteWorkoutHandling,
};
