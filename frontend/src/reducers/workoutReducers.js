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
	WORKOUT_CUSTOMER_LIST_REQUEST,
	WORKOUT_CUSTOMER_LIST_SUCCESS,
	WORKOUT_CUSTOMER_LIST_FAIL,
} from "../constants/workoutHandlingConstants";

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
export const workoutHandlingCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case WORKOUT_CREATE_REQUEST:
			return { loading: true };
		case WORKOUT_CREATE_SUCCESS:
			return { loading: false, success: true };
		case WORKOUT_CREATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
export const workoutHandlingUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case WORKOUT_UPDATE_REQUEST:
			return { loading: true };
		case WORKOUT_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case WORKOUT_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
export const workoutHandlingDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case WORKOUT_DELETE_REQUEST:
			return { loading: true };
		case WORKOUT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case WORKOUT_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
export const workoutHandlingCustomerListReducer = (state = { workouts: [] }, action) => {
	switch (action.type) {
		case WORKOUT_CUSTOMER_LIST_REQUEST:
			return { loading: true };
		case WORKOUT_CUSTOMER_LIST_SUCCESS:
			return { loading: false, workouts: action.payload };
		case WORKOUT_CUSTOMER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
