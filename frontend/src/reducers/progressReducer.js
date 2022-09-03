import {
	PROGRESS_LIST_CUSTOMER_REQUEST,
	PROGRESS_LIST_CUSTOMER_SUCCESS,
	PROGRESS_LIST_CUSTOMER_FAIL,
	PROGRESS_CREATE_CUSTOMER_REQUEST,
	PROGRESS_CREATE_CUSTOMER_SUCCESS,
	PROGRESS_CREATE_CUSTOMER_FAIL,
} from "../constants/progressConstant";

export const progressListReducer = (state = { progress: [] }, action) => {
	switch (action.type) {
		case PROGRESS_LIST_CUSTOMER_REQUEST:
			return { loading: true };
		case PROGRESS_LIST_CUSTOMER_SUCCESS:
			return { loading: false, progress: action.payload };
		case PROGRESS_LIST_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const progressCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PROGRESS_CREATE_CUSTOMER_REQUEST:
			return { loading: true };
		case PROGRESS_CREATE_CUSTOMER_SUCCESS:
			return { loading: false, success: true };
		case PROGRESS_CREATE_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
