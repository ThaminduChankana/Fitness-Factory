const WorkoutHandling = require("../models/workoutModel");
const {} = require("../routes/adminRoutes");
const asyncHandler = require("express-async-handler");

const getWorkoutHandling = asyncHandler(async (req, res) => {
    const workouthandle = await WorkoutHandling.find();
    res.json(workouthandle);
});

const createWorkoutHandling = asyncHandler(async (req, res) => {
    const { workoutID, name, workoutCategory, instructions, repetitions, tips, image } = req.body;
    const workoutExists = await WorkoutHandling.findOne({ workoutID });
		if (workoutExists) {
			res.status(400);
			throw new Error( "The Workout Alredy Exists !");
        } else {
            const workouthandle = new WorkoutHandling({
							workoutID,
							name,
							workoutCategory,
							instructions,
							repetitions,
							tips,
							image,
						});
            const createWorkoutHandling = await workouthandle.save();
            res.status(201).json(createWorkoutHandling);
    }
});

const getWorkoutHandlingId = asyncHandler(async (req, res) => {
    const workouthandle = await WorkoutHandling.findById(req.params.id);

    if (workouthandle) {
        res.json(workouthandle);
    } else {
        res.status(404).json({ message: "Workout not found" });
    }
});

const updateWorkoutHandling = asyncHandler(async (req, res) => {
    const { workoutID, name, workoutCategory, instructions, repetitions, tips, image } = req.body;

    const workouthandle = await WorkoutHandling.findById(req.params.id);
    if (workouthandle) {
			workouthandle.workoutID = workoutID;
			workouthandle.name = name;
			workouthandle.workoutCategory = workoutCategory;
			workouthandle.instructions = instructions;
			workouthandle.repetitions = repetitions;
			workouthandle.tips = tips;
			workouthandle.image = image;

			const updateWorkoutHandling = await workouthandle.save();
			res.json(updateWorkoutHandling);
		} else {
			res.status(404);
			throw new Error("Workout not found");
		}             
});

const deleteWorkoutHandling = asyncHandler(async (req, res) => {
    const workouthandle = await WorkoutHandling.findById(req.params.id);

    if (workouthandle) {
        await workouthandle.remove();
        res.json({ message: "Workout is Removed" });
    } else {
        res.status(404);
        throw new Error("Workout Remove  is Failed");
    }
});

module.exports = {
	getWorkoutHandling,
	createWorkoutHandling,
	getWorkoutHandlingId,
	updateWorkoutHandling,
	deleteWorkoutHandling,
};