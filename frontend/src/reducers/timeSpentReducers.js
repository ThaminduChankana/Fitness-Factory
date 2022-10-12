import {
	TIME_LIST_CUSTOMER_REQUEST,
	TIME_LIST_CUSTOMER_SUCCESS,
	TIME_LIST_CUSTOMER_FAIL,
	TIME_CREATE_CUSTOMER_REQUEST,
	TIME_CREATE_CUSTOMER_SUCCESS,
	TIME_CREATE_CUSTOMER_FAIL,
} from "../constants/timeSpentConstants";

export const TimeSpentListReducer = (state = { timeSpent: [] }, action) => {
	switch (action.type) {
		case TIME_LIST_CUSTOMER_REQUEST:
			return { loading: true };
		case TIME_LIST_CUSTOMER_SUCCESS:
			return { loading: false, timeSpent: action.payload };
		case TIME_LIST_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const TimeSpentCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case TIME_CREATE_CUSTOMER_REQUEST:
			return { loading: true };
		case TIME_CREATE_CUSTOMER_SUCCESS:
			return { loading: false, success: true };
		case TIME_CREATE_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
