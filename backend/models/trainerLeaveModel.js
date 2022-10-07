const mongoose = require("mongoose");

const trainerLeaveSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},

		nic: {
			type: String,
			required: true,
		},

		division: {
			type: String,
			required: true,
		},

		number_of_days: {
			type: String,
			required: true,
		},

		date_for_commencing_leave: {
			type: String,
			required: true,
		},

		date_for_resuming_duties: {
			type: String,
			required: true,
		},

		reasons_for_leave: {
			type: String,
			required: true,
		},

		approved: {
			type: String,
			required: true,
			default: "Pending",
		},
	},
	{
		timestamps: true,
	}
);

const TrainerLeave = mongoose.model("TrainerLeave", trainerLeaveSchema);

module.exports = TrainerLeave;
