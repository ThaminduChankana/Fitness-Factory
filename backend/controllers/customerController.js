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
			regDate: customer.regDate,
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
		res.status(400);
		throw new Error("Invalid NIC or Password");
	}

	const isMatch = await bcrypt.compare(password, customer.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
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
			regDate: customer.regDate,
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
		res.status(400);
		throw new Error("Customer not found !");
	}
});

const getCustomerProfileById = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params._id);

	if (customer) {
		res.json(customer);
	} else {
		res.status(400);
		throw new Error("Customer not found !");
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
			regDate: updatedCustomer.regDate,
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
			regDate: updatedCustomer.regDate,
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

const getCustomerCount = asyncHandler(async (req, res) => {
	const customers = await Customer.find({ year: new Date().getFullYear() });
	var z = 0;
	var a = 0,
		b = 0,
		c = 0,
		d = 0,
		e = 0;
	(f = 0), (g = 0), (h = 0), (i = 0), (j = 0), (k = 0), (l = 0);
	var loopData = {};
	var loopData = new Object();
	while (z < customers.length) {
		if (customers[z].createdAt.getMonth() + 1 === 01) {
			a = a + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 02) {
			b = b + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 03) {
			c = c + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 04) {
			d = d + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 05) {
			e = e + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 06) {
			f = f + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 07) {
			g = g + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 08) {
			h = h + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 09) {
			i = i + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 10) {
			j = j + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 11) {
			k = k + 1;
		} else if (customers[z].createdAt.getMonth() + 1 === 12) {
			l = l + 1;
		}
		z++;
	}
	var loopData = {
		january: a,
		february: b,
		march: c,
		april: d,
		may: e,
		june: f,
		july: g,
		august: h,
		september: i,
		october: j,
		november: k,
		december: l,
	};
	res.json(loopData);
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
	getCustomerCount,
};
