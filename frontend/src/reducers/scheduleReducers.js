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

export const WorkoutScheduleListReducer = (state = { workoutSchedules: [] }, action) => {
	switch (action.type) {
		case WORKOUT_SCHEDULE_LIST_REQUEST:
			return { loading: true };
		case WORKOUT_SCHEDULE_LIST_SUCCESS:
			return { loading: false, workoutSchedules: action.payload };
		case WORKOUT_SCHEDULE_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const WorkoutScheduleCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case WORKOUT_SCHEDULE_CREATE_REQUEST:
			return { loading: true };
		case WORKOUT_SCHEDULE_CREATE_SUCCESS:
			return { loading: false, success: true };
		case WORKOUT_SCHEDULE_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const WorkoutScheduleUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case WORKOUT_SCHEDULE_UPDATE_REQUEST:
			return { loading: true };
		case WORKOUT_SCHEDULE_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case WORKOUT_SCHEDULE_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const WorkoutScheduleDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case WORKOUT_SCHEDULE_DELETE_REQUEST:
			return { loading: true };
		case WORKOUT_SCHEDULE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case WORKOUT_SCHEDULE_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
