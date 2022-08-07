const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
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
	height: {
		type: Number,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	bmi: {
		type: Number,
		required: true,
		default: function () {
			return this.weight / ((this.height / 100) * (this.height / 100));
		},
	},
	pic: {
		type: String,
		required: true,
		default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", //default image which apply in the user
	},
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
