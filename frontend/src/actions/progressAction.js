import {
	PROGRESS_LIST_CUSTOMER_REQUEST,
	PROGRESS_LIST_CUSTOMER_SUCCESS,
	PROGRESS_LIST_CUSTOMER_FAIL,
	PROGRESS_CREATE_CUSTOMER_REQUEST,
	PROGRESS_CREATE_CUSTOMER_SUCCESS,
	PROGRESS_CREATE_CUSTOMER_FAIL,
} from "../constants/progressConstant";
import axios from "axios";
import swal from "sweetalert";

export const listProgress = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PROGRESS_LIST_CUSTOMER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/customer/progress/get`, config);

		dispatch({
			type: PROGRESS_LIST_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: PROGRESS_LIST_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const createProgressAction = (date, weight) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PROGRESS_CREATE_CUSTOMER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};
		const { data } = await axios.post(`/user/customer/progress/create`, { date, weight }, config);
		swal({
			title: "Success !!!",
			text: "Progress successfully created.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/progress-customer-report";
		}, 2000);
		dispatch({
			type: PROGRESS_CREATE_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: PROGRESS_CREATE_CUSTOMER_FAIL,
			payload: message,
		});
	}
};
