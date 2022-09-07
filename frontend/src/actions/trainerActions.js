import {
	TRAINER_LOGIN_FAIL,
	TRAINER_LOGIN_REQUEST,
	TRAINER_LOGIN_SUCCESS,
	TRAINER_LOGOUT,
	TRAINER_REGISTER_FAIL,
	TRAINER_REGISTER_REQUEST,
	TRAINER_REGISTER_SUCCESS,
	TRAINER_VIEW_FAIL,
	TRAINER_VIEW_REQUEST,
	TRAINER_VIEW_SUCCESS,
	TRAINER_UPDATE_FAIL,
	TRAINER_UPDATE_REQUEST,
	TRAINER_UPDATE_SUCCESS,
	TRAINER_DELETE_FAIL,
	TRAINER_DELETE_REQUEST,
	TRAINER_DELETE_SUCCESS,
	TRAINER_LIST_FAIL,
	TRAINER_LIST_REQUEST,
	TRAINER_LIST_SUCCESS,
	TRAINER_VIEW_BY_ID_FAIL,
	TRAINER_VIEW_BY_ID_REQUEST,
	TRAINER_VIEW_BY_ID_SUCCESS,
	TRAINER_UPDATE_BY_ID_FAIL,
	TRAINER_UPDATE_BY_ID_REQUEST,
	TRAINER_UPDATE_BY_ID_SUCCESS,
} from "../constants/trainerConstants";
import axios from "axios";
import swal from "sweetalert";

export const trainerLogin = (nic, password) => async (dispatch) => {
	try {
		dispatch({ type: TRAINER_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post("/user/trainer/login", { nic, password, isAdmin: false }, config);

		dispatch({ type: TRAINER_LOGIN_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Trainer Log In Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/trainer";
		}, 2000);
		localStorage.setItem("trainerInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: TRAINER_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export function authHeader() {
	let trainer = JSON.parse(localStorage.getItem("trainerInfo"));

	if (trainer && trainer.token) {
		return { Authorization: `Bearer ${trainer.token}` };
	} else {
		return {};
	}
}

export const trainerLogout = () => async (dispatch) => {
	localStorage.removeItem("trainerInfo");
	dispatch({ type: TRAINER_LOGOUT });
};

export const trainerRegister =
	(name, dob, nic, gender, telephone, address, email, password, qualifications, yrsexp, pic, regDate) =>
	async (dispatch) => {
		try {
			dispatch({ type: TRAINER_REGISTER_REQUEST });

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data } = await axios.post(
				`/user/trainer/register`,
				{
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
				},
				config
			);

			dispatch({ type: TRAINER_REGISTER_SUCCESS, payload: data });
			swal({
				title: "Success !!!",
				text: "Trainer Registration Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/admin-trainers";
			}, 2000);
		} catch (error) {
			dispatch({
				type: TRAINER_REGISTER_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			});
		}
	};

export const trainerViewProfile = (trainer) => async (dispatch, getState) => {
	try {
		dispatch({ type: TRAINER_VIEW_REQUEST });

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};

		const { data } = await axios.get("/user/trainer/view", trainer, config);

		dispatch({ type: TRAINER_VIEW_SUCCESS, payload: data });

		dispatch({ type: TRAINER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("trainerInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: TRAINER_VIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const trainerUpdateProfile = (trainer) => async (dispatch, getState) => {
	try {
		dispatch({ type: TRAINER_UPDATE_REQUEST });

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};

		const { data } = await axios.put("/user/trainer/edit", trainer, config);

		dispatch({ type: TRAINER_UPDATE_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Trainer Account Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/trainer-view";
		}, 2000);
		dispatch({ type: TRAINER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("trainerInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: TRAINER_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const trainersList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRAINER_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/admin/trainers`, config);

		dispatch({
			type: TRAINER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TRAINER_LIST_FAIL,
			payload: message,
		});
	}
};

export const trainerDeleteProfile = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRAINER_DELETE_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/admin/trainer/profile/view/${id}`, config);

		dispatch({
			type: TRAINER_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = "Trainer Delete Failed !!!";
		dispatch({
			type: TRAINER_DELETE_FAIL,
			payload: message,
		});
	}
};

export const trainerViewProfileById =
	(id, name, dob, nic, gender, telephone, address, email, password, qualifications, yrsexp, pic, regDate, message) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: TRAINER_VIEW_BY_ID_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};
			const { data } = await axios.get(
				`/user/admin/trainer/profile/view/${id}`,
				{
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
					message,
				},
				config
			);

			dispatch({
				type: TRAINER_VIEW_BY_ID_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: TRAINER_VIEW_BY_ID_FAIL,
				payload: message,
			});
		}
	};

export const trainerUpdateProfileById =
	(id, name, dob, nic, gender, telephone, address, email, password, qualifications, yrsexp, pic, regDate, message) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: TRAINER_UPDATE_BY_ID_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};
			const { data } = await axios.put(
				`/user/admin/trainer/profile/edit/${id}`,
				{
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
					message,
				},
				config
			);

			dispatch({
				type: TRAINER_UPDATE_BY_ID_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Trainer Account Update Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/admin-trainers";
			}, 2000);
		} catch (error) {
			const message = "Trainer Update Failed !!!";
			dispatch({
				type: TRAINER_UPDATE_BY_ID_FAIL,
				payload: message,
			});
		}
	};
