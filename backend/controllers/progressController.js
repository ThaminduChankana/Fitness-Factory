const Progress = require("../models/progressModel");
const asyncHandler = require("express-async-handler");

const getProgress = asyncHandler(async (req, res) => {
	const progress = await Progress.find({ customer: req.customer._id });
	res.json(progress);
});

const createProgress = asyncHandler(async (req, res) => {
	const { date, weight } = req.body;

	if (!date || !weight) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const progress = new Progress({
			customer: req.customer._id,
			date,
			weight,
		});

		const createdProgress = await progress.save();

		res.status(201).json(createdProgress);
	}
});

module.exports = {
	getProgress,
	createProgress,
};
