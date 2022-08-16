const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const {} = require("../routes/adminRoutes");
const {} = require("../routes/trainerRoutes");
const {} = require("../routes/customerRoutes");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerAdmin = asyncHandler(async (req, res) => {
	const { name, dob, nic, telephone, address, email, password, pic } = req.body;

	const adminExists = await Admin.findOne({ nic });
	if (adminExists) {
		res.status(400);
		throw new Error("Admin Profile Exists !");
	}

	const admin = new Admin({
		name,
		dob,
		nic,
		telephone,
		address,
		email,
		password,
		pic,
	});

	const salt = await bcrypt.genSalt(10);

	admin.password = await bcrypt.hash(password, salt);

	await admin.save();

	if (admin) {
		res.status(201).json({
			_id: admin._id,
			name: admin.name,
			isAdmin: admin.isAdmin,
			dob: admin.dob,
			nic: admin.nic,
			telephone: admin.telephone,
			address: admin.address,
			email: admin.email,
			pic: admin.pic,
			token: generateToken(admin._id),
		});
	} else {
		res.status(400);
		throw new Error("Admin Registration Failed !");
	}
});

const authAdmin = asyncHandler(async (req, res) => {
	const { nic, password } = req.body;

	const admin = await Admin.findOne({ nic });

	if (!admin) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	}

	const isMatch = await bcrypt.compare(password, admin.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	} else {
		res.status(201).json({
			_id: admin._id,
			name: admin.name,
			dob: admin.dob,
			nic: admin.nic,
			telephone: admin.telephone,
			address: admin.address,
			email: admin.email,
			password: admin.password,
			pic: admin.pic,
			token: generateToken(admin._id),
		});
	}
});

const getAdminProfile = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.admin._id);

	if (admin) {
		res.status(201).json(admin);
	} else {
		res.status(400);
		throw new Error("Admin Not Found !");
	}
});

const updateAdminProfile = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.admin._id);

	if (admin) {
		admin.name = req.body.name || admin.name;
		admin.dob = req.body.dob || admin.dob;
		admin.nic = req.body.nic || admin.nic;
		admin.telephone = req.body.telephone || admin.telephone;
		admin.address = req.body.address || admin.address;
		admin.email = req.body.email || admin.email;
		admin.pic = req.body.pic || admin.pic;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			admin.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedAdmin = await admin.save();

		res.json({
			_id: updatedAdmin._id,
			name: updatedAdmin.name,
			isAdmin: updatedAdmin.isAdmin,
			dob: updatedAdmin.dob,
			nic: updatedAdmin.nic,
			telephone: updatedAdmin.telephone,
			address: updatedAdmin.address,
			email: updatedAdmin.email,
			pic: updatedAdmin.pic,
			token: generateToken(updatedAdmin._id),
		});
	} else {
		res.status(404);
		throw new Error("Admin Not Found !");
	}
});

module.exports = { registerAdmin, authAdmin, getAdminProfile, updateAdminProfile };
