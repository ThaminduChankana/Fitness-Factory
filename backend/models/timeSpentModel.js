const mongoose = require("mongoose");

const timeSpentSchema = mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Customer",
	},
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
});
const TimeSpent = mongoose.model("TimeSpent ", timeSpentSchema);

module.exports = TimeSpent;
