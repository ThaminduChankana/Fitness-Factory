const mongoose = require("mongoose");

const progressSchema = mongoose.Schema(
	{
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Customer",
		},
		date: {
			type: String,
			required: true,
		},
		weight: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Progress = mongoose.model("Progress ", progressSchema);

module.exports = Progress;
