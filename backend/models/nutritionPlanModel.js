const mongoose = require("mongoose");

const nutritionPlanSchema = mongoose.Schema(
	{
		nic: {
			type: String,
			required: true,
		},
		startDate: {
			type: String,
			required: true,
		},
		endDate: {
			type: String,
			required: true,
		},
		breakfast: {
			type: String,
			required: true,
		},
		lunch: {
			type: String,
			required: true,
		},
		dinner: {
			type: String,
			required: true,
		},
		preWorkoutSnack: {
			type: String,
		},
		dos: {
			type: String,
			required: true,
		},
		donts: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const NutritionPlan = mongoose.model("NutritionPlan", nutritionPlanSchema);

module.exports = NutritionPlan;
