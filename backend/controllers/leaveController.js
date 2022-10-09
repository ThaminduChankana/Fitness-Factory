const TrainerLeave = require("../models/trainerLeaveModel");
const Trainer = require("../models/trainerModel");
const asyncHandler = require("express-async-handler");

const getTrainerLeaves = asyncHandler(async (req, res) => {
	const leave = await TrainerLeave.find();
	res.json(leave);
});

const getTrainerLeaveForEachTrainer = asyncHandler(async (req, res) => {
	const trainer = await Trainer.findById(req.params.id);

	const trainerLeave = await TrainerLeave.find({ nic: trainer.nic });

	res.json(trainerLeave);
});

const createTrainerLeave = asyncHandler(async (req, res) => {
	const {
		fullName,
		nic,
		division,
		number_of_days,
		date_for_commencing_leave,
		date_for_resuming_duties,
		reasons_for_leave,
	} = req.body;

	if (
		!fullName ||
		!nic ||
		!division ||
		!number_of_days ||
		!date_for_commencing_leave ||
		!date_for_resuming_duties ||
		!reasons_for_leave
	) {
		res.status(400);
		throw new Error("Please Fill all the Fields");
	} else {
		const leave = new TrainerLeave({
			fullName,
			nic,
			division,
			number_of_days,
			date_for_commencing_leave,
			date_for_resuming_duties,
			reasons_for_leave,
		});
		const createdLeave = await leave.save();

		res.status(201).json(createdLeave);
	}
});

const getTrainerLeaveById = asyncHandler(async (req, res) => {
	const leave = await TrainerLeave.findById(req.params.id);

	if (leave) {
		res.json(leave);
	} else {
		res.status(404).json({ message: "Leave Details not Found" });
	}
});

const updateTrainerLeave = asyncHandler(async (req, res) => {
	const {
		fullName,
		nic,
		division,
		number_of_days,
		date_for_commencing_leave,
		date_for_resuming_duties,
		reasons_for_leave,
	} = req.body;

	const leave = await TrainerLeave.findById(req.params.id);

	if (leave) {
		leave.fullName = fullName;
		leave.nic = nic;
		leave.division = division;
		leave.number_of_days = number_of_days;
		leave.date_for_commencing_leave = date_for_commencing_leave;
		leave.date_for_resuming_duties = date_for_resuming_duties;
		leave.reasons_for_leave = reasons_for_leave;

		const updatedLeave = await leave.save();
		res.json(updatedLeave);
	} else {
		res.status(404);
		throw new Error("Leave not Found");
	}
});

const deleteTrainerLeave = asyncHandler(async (req, res) => {
	const leave = await TrainerLeave.findById(req.params.id);

	if (leave) {
		await leave.remove();
		res.json({ message: "Leave Removed" });
	} else {
		res.status(404);
		throw new Error("Leave not Found");
	}
});

const approveTrainerLeaveByAdmin = asyncHandler(async (req, res) => {
	const { approved } = req.body;

	const leave = await TrainerLeave.findById(req.params.id);

	if (leave) {
		leave.approved = approved;

		const approvedLeave = await leave.save();
		res.json(approvedLeave);
	} else {
		res.status(404);
		throw new Error("Leave not Found");
	}
});

module.exports = {
	getTrainerLeaves,
	createTrainerLeave,
	getTrainerLeaveById,
	updateTrainerLeave,
	deleteTrainerLeave,
	getTrainerLeaveForEachTrainer,
	approveTrainerLeaveByAdmin,
};
