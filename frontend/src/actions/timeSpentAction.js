import {
	TIME_LIST_CUSTOMER_REQUEST,
	TIME_LIST_CUSTOMER_SUCCESS,
	TIME_LIST_CUSTOMER_FAIL,
	TIME_CREATE_CUSTOMER_REQUEST,
	TIME_CREATE_CUSTOMER_SUCCESS,
	TIME_CREATE_CUSTOMER_FAIL,
} from "../constants/timeSpentConstants";
import axios from "axios";
import swal from "sweetalert";

export const timeSpentListAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TIME_LIST_CUSTOMER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/customer/time/get`, config);

		dispatch({
			type: TIME_LIST_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TIME_LIST_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const createtimeSpentAction = (date, time) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TIME_CREATE_CUSTOMER_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};
		const { data } = await axios.post(`/user/customer/time/create`, { date, time }, config);
		swal({
			title: "Success !!!",
			text: "Your record successfully created.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/time-customer-report";
		}, 2000);
		dispatch({
			type: TIME_CREATE_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TIME_CREATE_CUSTOMER_FAIL,
			payload: message,
		});
	}
};
