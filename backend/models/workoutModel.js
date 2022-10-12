const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
	{
		workoutID: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		workoutCategory: {
			type: String,
			required: true,
		},
		instructions: {
			type: String,
			required: true,
		},
		repetitions: {
			type: String,
			required: true,
		},
		tips: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const WorkoutHandling = mongoose.model("Workout", workoutSchema);

module.exports = WorkoutHandling;
