const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		nic: {
			type: String,
			required: true,
			unique: true,
		},
		dob: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		mobile: {
			type: Number,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		qualifications: {
			type: String,
			required: true,
		},
		yrsexp: {
			type: Number,
			required: true,
		},
		pic: {
			type: String,
			required: true,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", //default image which apply in the user
		},
	},
	{
		timestamps: true,
	}
);

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
