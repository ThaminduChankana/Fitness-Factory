import {
	TRAINER_LEAVE_CREATE_FAIL,
	TRAINER_LEAVE_CREATE_REQUEST,
	TRAINER_LEAVE_CREATE_SUCCESS,
	TRAINER_LEAVE_DELETE_FAIL,
	TRAINER_LEAVE_DELETE_REQUEST,
	TRAINER_LEAVE_DELETE_SUCCESS,
	TRAINER_LEAVE_LIST_FAIL,
	TRAINER_LEAVE_LIST_REQUEST,
	TRAINER_LEAVE_LIST_SUCCESS,
	TRAINER_LEAVE_UPDATE_FAIL,
	TRAINER_LEAVE_UPDATE_REQUEST,
	TRAINER_LEAVE_UPDATE_SUCCESS,
	ADMIN_CONFIRM_LEAVE_LIST_FAIL,
	ADMIN_CONFIRM_LEAVE_LIST_REQUEST,
	ADMIN_CONFIRM_LEAVE_LIST_SUCCESS,
	ADMIN_CONFIRM_LEAVE_UPDATE_FAIL,
	ADMIN_CONFIRM_LEAVE_UPDATE_REQUEST,
	ADMIN_CONFIRM_LEAVE_UPDATE_SUCCESS,
} from "../constants/leaveConstants";
import axios from "axios";
import swal from "sweetalert";

export const listTrainerLeave = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRAINER_LEAVE_LIST_REQUEST,
		});

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};

		const { data } = await axios.get(`user/trainer/personal/trainer_leaves/${trainerInfo._id}`, config);

		dispatch({
			type: TRAINER_LEAVE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TRAINER_LEAVE_LIST_FAIL,
			payload: message,
		});
	}
};

export const createTrainerLeaveAction =
	(fullName, nic, division, number_of_days, date_for_commencing_leave, date_for_resuming_duties, reasons_for_leave) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: TRAINER_LEAVE_CREATE_REQUEST });

			const {
				trainer_Login: { trainerInfo },
			} = getState();

			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${trainerInfo.token}`,
				},
			};

			const { data } = await axios.post(
				`user/trainer/personal/trainer_leave/create`,
				{
					fullName,
					nic,
					division,
					number_of_days,
					date_for_commencing_leave,
					date_for_resuming_duties,
					reasons_for_leave,
				},
				config
			);

			dispatch({ type: TRAINER_LEAVE_CREATE_SUCCESS, payload: data });
			swal({
				title: "Success !!!",
				text: "Trainer Leave Details Submitted Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/trainer-leaves";
			}, 2000);
		} catch (error) {
			dispatch({
				type: TRAINER_LEAVE_CREATE_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			});
		}
	};

export const updateTrainerLeaveAction =
	(
		id,
		fullName,
		nic,
		division,
		number_of_days,
		date_for_commencing_leave,
		date_for_resuming_duties,
		reasons_for_leave
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: TRAINER_LEAVE_UPDATE_REQUEST });

			const {
				trainer_Login: { trainerInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${trainerInfo.token}`,
				},
			};
			const { data } = await axios.put(
				`/user/trainer/personal/trainer_leave/${id}`,
				{
					fullName,
					nic,
					division,
					number_of_days,
					date_for_commencing_leave,
					date_for_resuming_duties,
					reasons_for_leave,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Trainer Leave Update Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/trainer-leaves";
			}, 2000);

			dispatch({ type: TRAINER_LEAVE_UPDATE_SUCCESS, payload: data });
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: TRAINER_LEAVE_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const trainerLeaveDelete = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRAINER_LEAVE_DELETE_REQUEST,
		});

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/trainer/personal/trainer_leave/${id}`, config);

		dispatch({
			type: TRAINER_LEAVE_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = "Trainer Details Delete Failed !!!";
		dispatch({
			type: TRAINER_LEAVE_DELETE_FAIL,
			payload: message,
		});
	}
};

export const adminConfirmLeaveActions = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADMIN_CONFIRM_LEAVE_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/admin/trainer/trainer_leaves?id=${adminInfo._id}`, config);

		dispatch({
			type: ADMIN_CONFIRM_LEAVE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ADMIN_CONFIRM_LEAVE_LIST_FAIL,
			payload: message,
		});
	}
};

export const updateAdminApproveLeaveAction =
	(
		id,
		fullName,
		nic,
		division,
		number_of_days,
		date_for_commencing_leave,
		date_for_resuming_duties,
		reasons_for_leave,
		approved
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ADMIN_CONFIRM_LEAVE_UPDATE_REQUEST });

			const {
				admin_Login: { adminInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};
			const { data } = await axios.put(
				`/user/admin/trainer/trainer_leaves/approve/${id}`,
				{
					fullName,
					nic,
					division,
					number_of_days,
					date_for_commencing_leave,
					date_for_resuming_duties,
					reasons_for_leave,
					approved,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Leave Confirm Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/admin-trainer-leaves";
			}, 2000);

			dispatch({ type: ADMIN_CONFIRM_LEAVE_UPDATE_SUCCESS, payload: data });
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: ADMIN_CONFIRM_LEAVE_UPDATE_FAIL,
				payload: message,
			});
		}
	};
