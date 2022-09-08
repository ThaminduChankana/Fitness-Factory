const mongoose = require("mongoose");

const faqSchema = mongoose.Schema(
	{
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Customer",
		},
		nic: {
			type: String,
			required: true,
		},
		questionType: {
			type: String,
			required: true,
		},
		questionDescription: {
			type: String,
			required: true,
		},
		reply: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

const FAQ = mongoose.model("FAQ ", faqSchema);

module.exports = FAQ;
