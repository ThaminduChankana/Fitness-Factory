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
		dob: {
			type: String,
			required: true,
		},
		nic: {
			type: String,
			required: true,
			unique: true,
		},
		gender: {
			type: String,
			required: true,
		},
		telephone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		email: {
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
			type: String,
			required: true,
		},
		pic: {
			type: String,
			required: true,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", //default image which apply in the user
		},
		regDate: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
