import {
	TRAINERLEAVE_CREATE_FAIL,
	TRAINERLEAVE_CREATE_REQUEST,
	TRAINERLEAVE_CREATE_SUCCESS,
	TRAINERLEAVE_DELETE_FAIL,
	TRAINERLEAVE_DELETE_REQUEST,
	TRAINERLEAVE_DELETE_SUCCESS,
	TRAINERLEAVE_LIST_FAIL,
	TRAINERLEAVE_LIST_REQUEST,
	TRAINERLEAVE_LIST_SUCCESS,
	TRAINERLEAVE_UPDATE_FAIL,
	TRAINERLEAVE_UPDATE_REQUEST,
	TRAINERLEAVE_UPDATE_SUCCESS,
	ADMINCONFORMLEAVE_LIST_FAIL,
	ADMINCONFORMLEAVE_LIST_REQUEST,
	ADMINCONFORMLEAVE_LIST_SUCCESS,
	ADMINCONFORMLEAVE_UPDATE_FAIL,
	ADMINCONFORMLEAVE_UPDATE_REQUEST,
	ADMINCONFORMLEAVE_UPDATE_SUCCESS,
} from "../constants/leaveConstants";
import axios from "axios";
import swal from "sweetalert";

export const listTrainerLeave = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRAINERLEAVE_LIST_REQUEST,
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
			type: TRAINERLEAVE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TRAINERLEAVE_LIST_FAIL,
			payload: message,
		});
	}
};

export const createTrainerLeaveAction =
	(fullName, nic, division, number_of_days, date_for_commencing_leave, date_for_resuming_duties, reasons_for_leave) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: TRAINERLEAVE_CREATE_REQUEST });

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

			dispatch({ type: TRAINERLEAVE_CREATE_SUCCESS, payload: data });
			swal({
				title: "Success !!!",
				text: "Trainer Leave Details Submitted Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/trainerLeave";
			}, 2000);
		} catch (error) {
			dispatch({
				type: TRAINERLEAVE_CREATE_FAIL,
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
			dispatch({ type: TRAINERLEAVE_UPDATE_REQUEST });

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
				window.location.href = "/trainerLeave";
			}, 2000);

			dispatch({ type: TRAINERLEAVE_UPDATE_SUCCESS, payload: data });
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: TRAINERLEAVE_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const trainerLeaveDelete = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRAINERLEAVE_DELETE_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/trainer/personal/trainer_leave/${id}`, config);

		dispatch({
			type: TRAINERLEAVE_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = "Trainer Details Delete Failed !!!";
		dispatch({
			type: TRAINERLEAVE_DELETE_FAIL,
			payload: message,
		});
	}
};

export const adminConformLeaveActions = () => async (dispatch, getState) => {
	console.log("addmin confirm leave");
	try {
		dispatch({
			type: ADMINCONFORMLEAVE_LIST_REQUEST,
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
		console.log(data);
		dispatch({
			type: ADMINCONFORMLEAVE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ADMINCONFORMLEAVE_LIST_FAIL,
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
			dispatch({ type: ADMINCONFORMLEAVE_UPDATE_REQUEST });

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
				text: "Leave Conform Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/adminConformLeave";
			}, 2000);

			dispatch({ type: ADMINCONFORMLEAVE_UPDATE_SUCCESS, payload: data });
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: ADMINCONFORMLEAVE_UPDATE_FAIL,
				payload: message,
			});
		}
	};
