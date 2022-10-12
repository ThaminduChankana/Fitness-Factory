const TimeSpent = require("../models/timeSpentModel");
const asyncHandler = require("express-async-handler");

const getTimeSpent = asyncHandler(async (req, res) => {
	const timeSpent = await TimeSpent.find({ customer: req.customer._id });
	res.json(timeSpent);
});

const createTimeSpent = asyncHandler(async (req, res) => {
	const { date, time } = req.body;

	if (!date || !time) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const timeSpent = new TimeSpent({
			customer: req.customer._id,
			date,
			time,
		});

		const createTimeSpent = await timeSpent.save();

		res.status(201).json(createTimeSpent);
	}
});

module.exports = {
	getTimeSpent,
	createTimeSpent,
};
