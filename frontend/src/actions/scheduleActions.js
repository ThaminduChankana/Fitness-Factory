import {
	WORKOUT_SCHEDULE_LIST_REQUEST,
	WORKOUT_SCHEDULE_LIST_SUCCESS,
	WORKOUT_SCHEDULE_LIST_FAIL,
	WORKOUT_SCHEDULE_CREATE_REQUEST,
	WORKOUT_SCHEDULE_CREATE_SUCCESS,
	WORKOUT_SCHEDULE_CREATE_FAIL,
	WORKOUT_SCHEDULE_UPDATE_REQUEST,
	WORKOUT_SCHEDULE_UPDATE_SUCCESS,
	WORKOUT_SCHEDULE_UPDATE_FAIL,
	WORKOUT_SCHEDULE_DELETE_REQUEST,
	WORKOUT_SCHEDULE_DELETE_SUCCESS,
	WORKOUT_SCHEDULE_DELETE_FAIL,
} from "../constants/scheduleConstant";
import axios from "axios";
import swal from "sweetalert";

export const listWorkoutSchedule = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: WORKOUT_SCHEDULE_LIST_REQUEST,
		});

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/trainer/schedule/get`, config);

		dispatch({
			type: WORKOUT_SCHEDULE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: WORKOUT_SCHEDULE_LIST_FAIL,
			payload: message,
		});
	}
};
export const createWorkoutScheduleAction =
	(ScheduleID, nic, PreWorkout, MainWorkout, PostWorkout) => async (dispatch, getState) => {
		try {
			dispatch({
				type: WORKOUT_SCHEDULE_CREATE_REQUEST,
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
				`/user/trainer/schedule/create`,
				{
					ScheduleID,
					nic,
					PreWorkout,
					MainWorkout,
					PostWorkout,
				},
				config
			);
			swal({
				title: "Success !!!",
				text: "A Workout Schedule successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/workout-schedule-view";
			}, 2000);

			dispatch({
				type: WORKOUT_SCHEDULE_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = "Schedule creation failed";
			dispatch({
				type: WORKOUT_SCHEDULE_CREATE_FAIL,
				payload: message,
			});
			// alert("Schedule is alredy exist");

			swal({
				title: "Error!",
				text: "NIC Is Wrong",
				type: "error",
			});
		}
	};
	
export const updateWorkouteScheduleAction =
	(id, ScheduleID, nic, PreWorkout, MainWorkout, PostWorkout) => async (dispatch, getState) => {
		try {
			dispatch({
				type: WORKOUT_SCHEDULE_UPDATE_REQUEST,
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
				`/user/trainer/schedule/get/${id}`,
				{
					ScheduleID,
					nic,
					PreWorkout,
					MainWorkout,
					PostWorkout,
				},
				config
			);

			dispatch({
				type: WORKOUT_SCHEDULE_UPDATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Schedule successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/workout-schedule-view";
			}, 2000);
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: WORKOUT_SCHEDULE_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteWorkoutScheduleAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: WORKOUT_SCHEDULE_DELETE_REQUEST,
		});

		const {
			trainer_Login: { trainerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${trainerInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/trainer/schedule/get/${id}`, config);

		dispatch({
			type: WORKOUT_SCHEDULE_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: WORKOUT_SCHEDULE_DELETE_FAIL,
			payload: message,
		});
	}
};
