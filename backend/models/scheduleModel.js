const mongoose = require("mongoose");
const schedulePlanSchema = mongoose.Schema({
	nic: {
		type: String,
		required: true,
	},
	ScheduleID: {
		type: String,
		required: true,
	},
	PreWorkout: {
		type: String,
		required: true,
	},
	MainWorkout: {
		type: String,
		required: true,
	},
	PostWorkout: {
		type: String,
		required: true,
	},
});
const WorkoutSchedule = mongoose.model("WorkoutSchedule", schedulePlanSchema);

module.exports = WorkoutSchedule;
