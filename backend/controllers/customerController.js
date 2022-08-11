const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
const {} = require("../routes/customerRoutes");
const {} = require("../routes/trainerRoutes");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerCustomer = asyncHandler(async (req, res) => {

	const { name, dob, nic, gender, telephone, address, email, password, height, weight, bmi, pic, regDate } = req.body;

	const customerExists = await Customer.findOne({ nic });
	if (customerExists) {
		res.status(400);
		throw new Error("Customer Profile Exists !");
	}

	const customer = new Customer({
		name,
		dob,
		nic,
		gender,
		telephone,
		address,
		email,
		password,
		height,
		weight,
		bmi,
		pic,
		regDate,
	});

	const salt = await bcrypt.genSalt(10);

	customer.password = await bcrypt.hash(password, salt);

	await customer.save();

	if (customer) {
		res.status(201).json({
			_id: customer._id,
			name: customer.name,
			dob: customer.dob,
			nic: customer.nic,
			gender: customer.gender,
			telephone: customer.telephone,
			address: customer.address,
			email: customer.email,
			height: customer.height,
			weight: customer.weight,
			bmi: customer.bmi,
			pic: customer.pic,
			regdate: customer.regDate,
			token: generateToken(customer._id),
		});
	} else {
		res.status(400);
		throw new Error("Customer Registration Failed !");
	}
});

const authCustomer = asyncHandler(async (req, res) => {
	const { nic, password } = req.body;

	const customer = await Customer.findOne({ nic });

	if (!customer) {
		return res.status(400).json({ errors: [{ msg: "Invalid NIC or Password !" }] });
	}

	const isMatch = await bcrypt.compare(password, customer.password);

	if (!isMatch) {
		return res.status(400).json({ errors: [{ msg: "Invalid NIC or Password !" }] });
	} else {
		res.status(201).json({
			_id: customer._id,
			name: customer.name,
			dob: customer.dob,
			nic: customer.nic,
			gender: customer.gender,
			telephone: customer.telephone,
			address: customer.address,
			email: customer.email,
			height: customer.height,
			weight: customer.weight,
			bmi: customer.bmi,
			pic: customer.pic,
			regdate: customer.regDate,
			token: generateToken(customer._id),
		});
	}
});

const getCustomers = asyncHandler(async (req, res) => {
	const customers = await Customer.find();
	res.json(customers);
});

const getCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		res.json(customer);
	} else {
		res.status(404).json({ message: "Customer not found !" });
	}
});

const getCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		res.json(customer);
	} else {
		res.status(404).json({ message: "Customer not found !" });
	}
});

const updateCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		customer.name = req.body.name || customer.name;
		customer.dob = req.body.dob || customer.dob;
		customer.nic = req.body.nic || customer.nic;
		customer.gender = req.body.gender || customer.gender;
		customer.telephone = req.body.telephone || customer.telephone;
		customer.address = req.body.address || customer.address;
		customer.email = req.body.email || customer.email;
		customer.height = req.body.height || customer.height;
		customer.weight = req.body.weight || customer.weight;
		customer.bmi = req.body.bmi || customer.bmi;
		customer.pic = req.body.pic || customer.pic;
		customer.regDate = req.body.regDate || customer.regDate;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			customer.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedCustomer = await customer.save();

		res.json({
			_id: updatedCustomer._id,
			name: updatedCustomer.name,
			dob: updatedCustomer.dob,
			nic: updatedCustomer.nic,
			gender: updatedCustomer.gender,
			telephone: updatedCustomer.telephone,
			address: updatedCustomer.address,
			email: updatedCustomer.email,
			height: updatedCustomer.height,
			weight: updatedCustomer.weight,
			bmi: updatedCustomer.bmi,
			pic: updatedCustomer.pic,
			regdate: updatedCustomer.regDate,
			token: generateToken(updatedCustomer._id),
		});
	} else {
		res.status(404);
		throw new Error("Customer Not Found !");
	}
});

const updateCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		customer.name = req.body.name || customer.name;
		customer.dob = req.body.dob || customer.dob;
		customer.nic = req.body.nic || customer.nic;
		customer.gender = req.body.gender || customer.gender;
		customer.telephone = req.body.telephone || customer.telephone;
		customer.address = req.body.address || customer.address;
		customer.email = req.body.email || customer.email;
		customer.height = req.body.height || customer.height;
		customer.weight = req.body.weight || customer.weight;
		customer.bmi = req.body.bmi || customer.bmi;
		customer.pic = req.body.pic || customer.pic;
		customer.regDate = req.body.regDate || customer.regDate;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			customer.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedCustomer = await customer.save();

		res.json({
			_id: updatedCustomer._id,
			name: updatedCustomer.name,
			dob: updatedCustomer.dob,
			nic: updatedCustomer.nic,
			gender: updatedCustomer.gender,
			telephone: updatedCustomer.telephone,
			address: updatedCustomer.address,
			email: updatedCustomer.email,
			height: updatedCustomer.height,
			weight: updatedCustomer.weight,
			bmi: updatedCustomer.bmi,
			pic: updatedCustomer.pic,
			regdate: updatedCustomer.regDate,
			token: generateToken(updatedCustomer._id),
		});
	} else {
		res.status(404);
		throw new Error("Customer Not Found !");
	}
});

const deleteCustomerProfile = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.customer._id);

	if (customer) {
		await customer.remove();
		res.json({ message: "Customer Removed !" });
	} else {
		res.status(404);
		throw new Error("Customer not Found !");
	}
});

const deleteCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		await customer.remove();
		res.json({ message: "Customer Removed !" });
	} else {
		res.status(404);
		throw new Error("Customer not Found !");
	}
});

module.exports = {
	registerCustomer,
	authCustomer,
	getCustomers,
	getCustomerProfile,
	getCustomerProfileById,
	updateCustomerProfile,
	updateCustomerProfileById,
	deleteCustomerProfile,
	deleteCustomerProfileById,
};
