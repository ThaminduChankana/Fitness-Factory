const NutritionPlan = require("../models/nutritionPlanModel");
const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");

const getNutritionPlans = asyncHandler(async (req, res) => {
	const nutritionplans = await NutritionPlan.find();
	res.json(nutritionplans);
});

const createNutritionPlan = asyncHandler(async (req, res) => {
	const { nic, startDate, endDate, breakfast, lunch, dinner, preWorkoutSnack, dos, donts } = req.body;
	const customer = await Customer.findOne({ nic: nic });
	const nutritionplans = await NutritionPlan.findOne({ nic: nic });

	if (!nic || !startDate || !endDate || !breakfast || !lunch || !dinner || !preWorkoutSnack || !dos || !donts) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else if (customer != null && nutritionplans == null) {
		const nutritionPlan = new NutritionPlan({
			nic,
			startDate,
			endDate,
			breakfast,
			lunch,
			dinner,
			preWorkoutSnack,
			dos,
			donts,
		});

		const createdNutritionPlan = await nutritionPlan.save();

		res.status(201).json(createdNutritionPlan);
	} else if (nutritionplans != null) {
		res.status(404);
		throw new Error("Nutrition Plan Exists");
	} else {
		res.status(404);
		throw new Error("Not a registered customer");
	}
});

const getNutritionPlanById = asyncHandler(async (req, res) => {
	const nutritionPlan = await NutritionPlan.findById(req.params.id);

	if (nutritionPlan) {
		res.json(nutritionPlan);
	} else {
		res.status(404).json({ message: "Nutrition Plan not found" });
	}
});

const updateNutritionPlan = asyncHandler(async (req, res) => {
	const { nic, startDate, endDate, breakfast, lunch, dinner, preWorkoutSnack, dos, donts } = req.body;

	const nutritionPlan = await NutritionPlan.findById(req.params.id);

	if (nutritionPlan) {
		nutritionPlan.nic = nic;
		nutritionPlan.startDate = startDate;
		nutritionPlan.endDate = endDate;
		nutritionPlan.breakfast = breakfast;
		nutritionPlan.lunch = lunch;
		nutritionPlan.dinner = dinner;
		nutritionPlan.preWorkoutSnack = preWorkoutSnack;
		nutritionPlan.dos = dos;
		nutritionPlan.donts = donts;

		const updatedNutritionPlan = await nutritionPlan.save();
		res.json(updatedNutritionPlan);
	} else {
		res.status(404);
		throw new Error("Nutrition Plan not found");
	}
});

const deleteNutritionPlan = asyncHandler(async (req, res) => {
	const nutritionPlan = await NutritionPlan.findById(req.params.id);

	if (nutritionPlan) {
		await nutritionPlan.remove();
		res.json({ message: "Nutrition Plan  Removed" });
	} else {
		res.status(404);
		throw new Error("Nutrition Plan  not Found");
	}
});

const getNutririonPlanForeachCustomer = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	const nutritionPlan = await NutritionPlan.findOne({ nic: customer.nic });
	if (nutritionPlan != null) {
		res.json(nutritionPlan);
	} else if (nutritionPlan == null) {
		res.status(404);
		throw new Error("You don't have any nutrition plan yet");
	}
});

module.exports = {
	getNutritionPlans,
	createNutritionPlan,
	getNutritionPlanById,
	updateNutritionPlan,
	deleteNutritionPlan,
	getNutririonPlanForeachCustomer,
};
