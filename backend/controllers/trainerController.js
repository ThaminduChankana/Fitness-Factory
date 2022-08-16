const asyncHandler = require("express-async-handler");
const Trainer = require("../models/trainerModel");
const {} = require("../routes/trainerRoutes");
const {} = require("../routes/customerRoutes");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerTrainer = asyncHandler(async (req, res) => {
	const { name, dob, nic, gender, telephone, address, email, password, qualifications, yrsexp, pic, regDate } =
		req.body;

	const trainerExists = await Trainer.findOne({ nic });
	if (trainerExists) {
		res.status(400);
		throw new Error("Trainer Profile Exists !");
	}

	const trainer = new Trainer({
		name,
		dob,
		nic,
		gender,
		telephone,
		address,
		email,
		password,
		qualifications,
		yrsexp,
		pic,
		regDate,
	});

	const salt = await bcrypt.genSalt(10);

	trainer.password = await bcrypt.hash(password, salt);

	await trainer.save();

	if (trainer) {
		res.status(201).json({
			_id: trainer._id,
			name: trainer.name,
			dob: trainer.dob,
			nic: trainer.nic,
			gender: trainer.gender,
			telephone: trainer.telephone,
			address: trainer.address,
			email: trainer.email,
			qualifications: trainer.qualifications,
			yrsexp: trainer.yrsexp,
			pic: trainer.pic,
			regDate: trainer.regDate,
			token: generateToken(trainer._id),
		});
	} else {
		res.status(400);
		throw new Error("Trainer Registration Failed !");
	}
});

const authTrainer = asyncHandler(async (req, res) => {
	const { nic, password } = req.body;

	const trainer = await Trainer.findOne({ nic });

	if (!trainer) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	}

	const isMatch = await bcrypt.compare(password, trainer.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	} else {
		res.status(201).json({
			_id: trainer._id,
			name: trainer.name,
			dob: trainer.dob,
			nic: trainer.nic,
			gender: trainer.gender,
			telephone: trainer.telephone,
			address: trainer.address,
			email: trainer.email,
			qualifications: trainer.qualifications,
			yrsexp: trainer.yrsexp,
			pic: trainer.pic,
			regDate: trainer.regDate,
			token: generateToken(trainer._id),
		});
	}
});

const getTrainers = asyncHandler(async (req, res) => {
	const trainers = await Trainer.find();
	res.json(trainers);
});

const getTrainerProfile = asyncHandler(async (req, res) => {
	const trainer = await Trainer.findById(req.trainer._id);

	if (trainer) {
		res.json(trainer);
	} else {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	}
});

const getTrainerProfileById = asyncHandler(async (req, res) => {
	const trainer = await Trainer.findById(req.params._id);
	if (trainer) {
		res.json(trainer);
	} else {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	}
});

const updateTrainerProfile = asyncHandler(async (req, res) => {
	const trainer = await Trainer.findById(req.trainer._id);

	if (trainer) {
		trainer.name = req.body.name || trainer.name;
		trainer.dob = req.body.dob || trainer.dob;
		trainer.nic = req.body.nic || trainer.nic;
		trainer.gender = req.body.gender || trainer.gender;
		trainer.telephone = req.body.telephone || trainer.telephone;
		trainer.address = req.body.address || trainer.address;
		trainer.email = req.body.email || trainer.email;
		trainer.qualifications = req.body.qualifications || trainer.qualifications;
		trainer.yrsexp = req.body.yrsexp || trainer.qualifications;
		trainer.pic = req.body.pic || trainer.pic;
		trainer.regDate = req.body.regDate || trainer.regDate;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			trainer.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedTrainer = await trainer.save();

		res.json({
			_id: updatedTrainer._id,
			name: updatedTrainer.name,
			dob: updatedTrainer.dob,
			nic: updatedTrainer.nic,
			gender: updatedTrainer.gender,
			telephone: updatedTrainer.telephone,
			address: updatedTrainer.address,
			email: updatedTrainer.email,
			qualifications: updatedTrainer.qualifications,
			yrsexp: updatedTrainer.yrsexp,
			pic: updatedTrainer.pic,
			regDate: updatedTrainer.regDate,
			token: generateToken(updatedTrainer._id),
		});
	} else {
		res.status(404);
		throw new Error("Trainer Not Found !");
	}
});

const updateTrainerProfileById = asyncHandler(async (req, res) => {
	const trainer = await Trainer.findById(req.params._id);

	if (trainer) {
		trainer.name = req.body.name || trainer.name;
		trainer.dob = req.body.dob || trainer.dob;
		trainer.nic = req.body.nic || trainer.nic;
		trainer.gender = req.body.gender || trainer.gender;
		trainer.telephone = req.body.telephone || trainer.telephone;
		trainer.address = req.body.address || trainer.address;
		trainer.email = req.body.email || trainer.email;
		trainer.qualifications = req.body.qualifications || trainer.qualifications;
		trainer.yrsexp = req.body.yrsexp || trainer.qualifications;
		trainer.pic = req.body.pic || trainer.pic;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			trainer.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedTrainer = await trainer.save();

		res.json({
			_id: updatedTrainer._id,
			name: updatedTrainer.name,
			dob: updatedTrainer.dob,
			nic: updatedTrainer.nic,
			gender: updatedTrainer.gender,
			telephone: updatedTrainer.telephone,
			address: updatedTrainer.address,
			email: updatedTrainer.email,
			qualifications: updatedTrainer.qualifications,
			yrsexp: updatedTrainer.yrsexp,
			pic: updatedTrainer.pic,
			regDate: updatedTrainer.regDate,
			token: generateToken(updatedTrainer._id),
		});
	} else {
		res.status(404);
		throw new Error("Trainer Not Found !");
	}
});

const deleteTrainerProfile = asyncHandler(async (req, res) => {
	const trainer = await Trainer.findById(req.trainer._id);

	if (trainer) {
		await trainer.remove();
		res.json({ message: "Trainer Removed !" });
	} else {
		res.status(404);
		throw new Error("Trainer not Found !");
	}
});

const deleteTrainerProfileById = asyncHandler(async (req, res) => {
	const trainer = await Trainer.findById(req.params._id);

	if (trainer) {
		await trainer.remove();
		res.json({ message: "Trainer Account Removed" });
	} else {
		res.status(404);
		throw new Error("Trainer Account not Found");
	}
});

module.exports = {
	registerTrainer,
	authTrainer,
	getTrainers,
	getTrainerProfileById,
	getTrainerProfile,
	updateTrainerProfile,
	updateTrainerProfileById,
	deleteTrainerProfile,
	deleteTrainerProfileById,
};
