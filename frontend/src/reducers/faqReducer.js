import {
	FAQ_LIST_CUSTOMER_REQUEST,
	FAQ_LIST_CUSTOMER_SUCCESS,
	FAQ_LIST_CUSTOMER_FAIL,
	FAQ_CREATE_CUSTOMER_REQUEST,
	FAQ_CREATE_CUSTOMER_SUCCESS,
	FAQ_CREATE_CUSTOMER_FAIL,
	FAQ_UPDATE_CUSTOMER_REQUEST,
	FAQ_UPDATE_CUSTOMER_SUCCESS,
	FAQ_UPDATE_CUSTOMER_FAIL,
	FAQ_DELETE_CUSTOMER_REQUEST,
	FAQ_DELETE_CUSTOMER_SUCCESS,
	FAQ_DELETE_CUSTOMER_FAIL,
	FAQ_LIST_TRAINER_REQUEST,
	FAQ_LIST_TRAINER_SUCCESS,
	FAQ_LIST_TRAINER_FAIL,
	FAQ_UPDATE_TRAINER_REQUEST,
	FAQ_UPDATE_TRAINER_SUCCESS,
	FAQ_UPDATE_TRAINER_FAIL,
} from "../constants/faqConstant";

export const faqListReducer = (state = { faqs: [] }, action) => {
	switch (action.type) {
		case FAQ_LIST_CUSTOMER_REQUEST:
			return { loading: true };
		case FAQ_LIST_CUSTOMER_SUCCESS:
			return { loading: false, faqs: action.payload };
		case FAQ_LIST_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const faqListTrainerReducer = (state = { faqForTrainer: [] }, action) => {
	switch (action.type) {
		case FAQ_LIST_TRAINER_REQUEST:
			return { loading: true };
		case FAQ_LIST_TRAINER_SUCCESS:
			return { loading: false, faqForTrainer: action.payload };
		case FAQ_LIST_TRAINER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const faqCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case FAQ_CREATE_CUSTOMER_REQUEST:
			return { loading: true };
		case FAQ_CREATE_CUSTOMER_SUCCESS:
			return { loading: false, success: true };
		case FAQ_CREATE_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const faqUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case FAQ_UPDATE_CUSTOMER_REQUEST:
			return { loading: true };
		case FAQ_UPDATE_CUSTOMER_SUCCESS:
			return { loading: false, success: true };
		case FAQ_UPDATE_CUSTOMER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const faqUpdateReducerForTrainer = (state = {}, action) => {
	switch (action.type) {
		case FAQ_UPDATE_TRAINER_REQUEST:
			return { loading: true };
		case FAQ_UPDATE_TRAINER_SUCCESS:
			return { loading: false, success: true };
		case FAQ_UPDATE_TRAINER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const faqDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case FAQ_DELETE_CUSTOMER_REQUEST:
			return { loading: true };
		case FAQ_DELETE_CUSTOMER_SUCCESS:
			return { loading: false, success: true };
		case FAQ_DELETE_CUSTOMER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
