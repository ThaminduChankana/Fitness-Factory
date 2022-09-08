const FAQ = require("../models/faqModel");
const asyncHandler = require("express-async-handler");

const getFaqs = asyncHandler(async (req, res) => {
	const faqs = await FAQ.find({ customer: req.customer._id });
	res.json(faqs);
});

const getFaqsForTrainer = asyncHandler(async (req, res) => {
	const faqs = await FAQ.find();
	res.json(faqs);
});

const createFaq = asyncHandler(async (req, res) => {
	const { nic, questionType, questionDescription } = req.body;

	if (!nic || !questionType || !questionDescription) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const faq = new FAQ({
			customer: req.customer._id,
			nic,
			questionType,
			questionDescription,
		});

		const createdFaq = await faq.save();

		res.status(201).json(createdFaq);
	}
});

const getFaqById = asyncHandler(async (req, res) => {
	const faq = await FAQ.findById(req.params.id);

	if (faq) {
		res.json(faq);
	} else {
		res.status(404).json({ message: "FAQ not found" });
	}
});

const updateFaq = asyncHandler(async (req, res) => {
	const { questionType, questionDescription } = req.body;

	const faq = await FAQ.findById(req.params.id);

	if (faq) {
		faq.questionType = questionType;
		faq.questionDescription = questionDescription;

		const updatedFaq = await faq.save();
		res.json(updatedFaq);
	} else {
		res.status(404);
		throw new Error("FAQ not found");
	}
});

const updateFaqForTrainer = asyncHandler(async (req, res) => {
	const { reply } = req.body;

	const faq = await FAQ.findById(req.params.id);

	if (faq) {
		faq.reply = reply;

		const updatedFaq = await faq.save();
		res.json(updatedFaq);
	} else {
		res.status(404);
		throw new Error("FAQ not found");
	}
});

const deleteFaq = asyncHandler(async (req, res) => {
	const faq = await FAQ.findById(req.params.id);

	if (faq) {
		await faq.remove();
		res.json({ message: "FAQ  Removed" });
	} else {
		res.status(404);
		throw new Error("FAQ  not Found");
	}
});

module.exports = {
	getFaqs,
	getFaqsForTrainer,
	createFaq,
	getFaqById,
	updateFaq,
	updateFaqForTrainer,
	deleteFaq,
};
