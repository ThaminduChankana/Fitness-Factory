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
	TRAINER_UPDATE_BY_ID_REQUEST,
	TRAINER_UPDATE_BY_ID_SUCCESS,
	TRAINER_UPDATE_BY_ID_FAIL,
} from "../constants/trainerConstants";

export const trainerLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_LOGIN_REQUEST:
			return { loading: true };
		case TRAINER_LOGIN_SUCCESS:
			return { loading: false, trainerInfo: action.payload };
		case TRAINER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case TRAINER_LOGOUT:
			return {};

		default:
			return state;
	}
};

export const trainerRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_REGISTER_REQUEST:
			return { loading: true };
		case TRAINER_REGISTER_SUCCESS:
			return { loading: false, trainerInfo: action.payload };
		case TRAINER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const trainerViewReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_VIEW_REQUEST:
			return { loading: true };
		case TRAINER_VIEW_SUCCESS:
			return { loading: false, trainerInfo: action.payload };
		case TRAINER_VIEW_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const trainerUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_UPDATE_REQUEST:
			return { loading: true };
		case TRAINER_UPDATE_SUCCESS:
			return { loading: false, trainerInfo: action.payload, success: true };
		case TRAINER_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const trainerDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_DELETE_REQUEST:
			return { loading: true };
		case TRAINER_DELETE_SUCCESS:
			return { loading: false, trainerInfo: action.payload, success: true };
		case TRAINER_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const trainerListReducer = (state = { trainers: [] }, action) => {
	switch (action.type) {
		case TRAINER_LIST_REQUEST:
			return { loading: true };
		case TRAINER_LIST_SUCCESS:
			return { loading: false, trainers: action.payload };
		case TRAINER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const trainerViewByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_VIEW_BY_ID_REQUEST:
			return { loading: true };
		case TRAINER_VIEW_BY_ID_SUCCESS:
			return { loading: false, trainerInfo: action.payload, success: true };
		case TRAINER_VIEW_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const trainerUpdateByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_UPDATE_BY_ID_REQUEST:
			return { loading: true };
		case TRAINER_UPDATE_BY_ID_SUCCESS:
			return { loading: false, trainerInfo: action.payload, success: true };
		case TRAINER_UPDATE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
