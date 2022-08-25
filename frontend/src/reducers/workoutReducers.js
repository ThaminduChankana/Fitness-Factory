import {
	WORKOUT_LIST_REQUEST,
	WORKOUT_LIST_SUCCESS,
	WORKOUT_LIST_FAIL,
	WORKOUT_CREATE_REQUEST,
	WORKOUT_CREATE_SUCCESS,
	WORKOUT_CREATE_FAIL,
	WORKOUT_UPDATE_REQUEST,
	WORKOUT_UPDATE_SUCCESS,
	WORKOUT_UPDATE_FAIL,
	WORKOUT_DELETE_REQUEST,
	WORKOUT_DELETE_SUCCESS,
	WORKOUT_DELETE_FAIL,
} from "../constants/workoutConstants";

export const workoutHandlingListReducer = (state = { workouts: [] }, action) => {
	switch (action.type) {
		case WORKOUT_LIST_REQUEST:
			return { loading: true };
		case WORKOUT_LIST_SUCCESS:
			return { loading: false, workouts: action.payload };
		case WORKOUT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
