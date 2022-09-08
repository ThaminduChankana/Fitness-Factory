import {
	FAQ_LIST_CUSTOMER_REQUEST,
	FAQ_LIST_CUSTOMER_SUCCESS,
	FAQ_LIST_CUSTOMER_FAIL,
	FAQ_CREATE_CUSTOMER_REQUEST,
	FAQ_CREATE_CUSTOMER_SUCCESS,
	FAQ_CREATE_CUSTOMER_FAIL,
	FAQ_UPDATE_CUSTOMER_REQUEST,
	FAQ_UPDATE_CUSTOMER_SUCCESS,
	FAQ_UPDATE_CUSTOMER_FAIL,
	FAQ_DELETE_CUSTOMER_REQUEST,
	FAQ_DELETE_CUSTOMER_SUCCESS,
	FAQ_DELETE_CUSTOMER_FAIL,
	FAQ_LIST_TRAINER_REQUEST,
	FAQ_LIST_TRAINER_SUCCESS,
	FAQ_LIST_TRAINER_FAIL,
	FAQ_UPDATE_TRAINER_REQUEST,
	FAQ_UPDATE_TRAINER_SUCCESS,
	FAQ_UPDATE_TRAINER_FAIL,
} from "../constants/faqConstant";
import axios from "axios";
import swal from "sweetalert";

export const listFaqs = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: FAQ_LIST_CUSTOMER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/customer/faq/get`, config);

		dispatch({
			type: FAQ_LIST_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FAQ_LIST_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const listFaqsTrainer = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: FAQ_LIST_TRAINER_REQUEST,
		});

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/trainer/faq/get`, config);

		dispatch({
			type: FAQ_LIST_TRAINER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FAQ_LIST_TRAINER_FAIL,
			payload: message,
		});
	}
};

export const createFaqAction = (nic, questionType, questionDescription) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FAQ_CREATE_CUSTOMER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};
		const { data } = await axios.post(`/user/customer/faq/create`, { nic, questionType, questionDescription }, config);
		swal({
			title: "Success !!!",
			text: "FAQ successfully created.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/faq-customer-view";
		}, 2000);
		dispatch({
			type: FAQ_CREATE_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FAQ_CREATE_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const updateFaqAction = (id, questionType, questionDescription) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FAQ_UPDATE_CUSTOMER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/user/customer/faq/get/${id}`,
			{
				questionType,
				questionDescription,
			},
			config
		);
		swal({
			title: "Success !!!",
			text: "FAQ successfully updated.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/faq-customer-view";
		}, 2000);

		dispatch({
			type: FAQ_UPDATE_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FAQ_UPDATE_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const updateFaqTrainerAction = (id, reply) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FAQ_UPDATE_TRAINER_REQUEST,
		});

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/user/trainer/faq/get/${id}`,
			{
				reply,
			},
			config
		);
		swal({
			title: "Success !!!",
			text: "FAQ successfully updated.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/faq-trainer-view";
		}, 2000);

		dispatch({
			type: FAQ_UPDATE_TRAINER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FAQ_UPDATE_TRAINER_FAIL,
			payload: message,
		});
	}
};

export const deleteFaqAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FAQ_DELETE_CUSTOMER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/customer/faq/get/${id}`, config);

		dispatch({
			type: FAQ_DELETE_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FAQ_DELETE_CUSTOMER_FAIL,
			payload: message,
		});
	}
};
