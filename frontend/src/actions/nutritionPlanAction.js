import {
	NUTRITION_PLAN_LIST_TRAINER_REQUEST,
	NUTRITION_PLAN_LIST_TRAINER_SUCCESS,
	NUTRITION_PLAN_LIST_TRAINER_FAIL,
	NUTRITION_PLAN_CREATE_TRAINER_REQUEST,
	NUTRITION_PLAN_CREATE_TRAINER_SUCCESS,
	NUTRITION_PLAN_CREATE_TRAINER_FAIL,
	NUTRITION_PLAN_UPDATE_TRAINER_REQUEST,
	NUTRITION_PLAN_UPDATE_TRAINER_SUCCESS,
	NUTRITION_PLAN_UPDATE_TRAINER_FAIL,
	NUTRITION_PLAN_DELETE_TRAINER_REQUEST,
	NUTRITION_PLAN_DELETE_TRAINER_SUCCESS,
	NUTRITION_PLAN_DELETE_TRAINER_FAIL,
	NUTRITION_PLAN_LIST_ADMIN_REQUEST,
	NUTRITION_PLAN_LIST_ADMIN_SUCCESS,
	NUTRITION_PLAN_LIST_ADMIN_FAIL,
} from "../constants/nutritionPlanConstant";
import axios from "axios";
import swal from "sweetalert";

export const listNutritionPlans = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: NUTRITION_PLAN_LIST_TRAINER_REQUEST,
		});

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/trainer/nutrition_plan/get`, config);

		dispatch({
			type: NUTRITION_PLAN_LIST_TRAINER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: NUTRITION_PLAN_LIST_TRAINER_FAIL,
			payload: message,
		});
	}
};

export const listNutritionPlansAdmin = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: NUTRITION_PLAN_LIST_ADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/admin/nutrition_plan/get`, config);

		dispatch({
			type: NUTRITION_PLAN_LIST_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: NUTRITION_PLAN_LIST_ADMIN_FAIL,
			payload: message,
		});
	}
};

export const createNutritionPlanAction =
	(nic, startDate, endDate, breakfast, lunch, dinner, preWorkoutSnack, dos, donts) => async (dispatch, getState) => {
		try {
			dispatch({
				type: NUTRITION_PLAN_CREATE_TRAINER_REQUEST,
			});

			const {
				trainer_Login: { trainerInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${trainerInfo.token}`,
				},
			};
			const { data } = await axios.post(
				`/user/trainer/nutrition_plan/create`,
				{
					nic,
					startDate,
					endDate,
					breakfast,
					lunch,
					dinner,
					preWorkoutSnack,
					dos,
					donts,
				},
				config
			);
			swal({
				title: "Success !!!",
				text: "Nutrition Plan successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/nutrition-plan-trainer-view";
			}, 2000);
			dispatch({
				type: NUTRITION_PLAN_CREATE_TRAINER_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: NUTRITION_PLAN_CREATE_TRAINER_FAIL,
				payload: message,
			});
		}
	};

export const updateNutritionPlanAction =
	(id, nic, startDate, endDate, breakfast, lunch, dinner, preWorkoutSnack, dos, donts) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: NUTRITION_PLAN_UPDATE_TRAINER_REQUEST,
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
				`/user/trainer/nutrition_plan/get/${id}`,
				{
					nic,
					startDate,
					endDate,
					breakfast,
					lunch,
					dinner,
					preWorkoutSnack,
					dos,
					donts,
				},
				config
			);
			swal({
				title: "Success !!!",
				text: "Nutrition Plan successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/nutrition-plan-trainer-view";
			}, 2000);

			dispatch({
				type: NUTRITION_PLAN_UPDATE_TRAINER_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: NUTRITION_PLAN_UPDATE_TRAINER_FAIL,
				payload: message,
			});
		}
	};

export const deleteNutritionPlanAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: NUTRITION_PLAN_DELETE_TRAINER_REQUEST,
		});

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/trainer/nutrition_plan/get/${id}`, config);

		dispatch({
			type: NUTRITION_PLAN_DELETE_TRAINER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: NUTRITION_PLAN_DELETE_TRAINER_FAIL,
			payload: message,
		});
	}
};
