import {
	TRAINER_LEAVE_CREATE_FAIL,
	TRAINER_LEAVE_CREATE_REQUEST,
	TRAINER_LEAVE_CREATE_SUCCESS,
	TRAINER_LEAVE_DELETE_FAIL,
	TRAINER_LEAVE_DELETE_REQUEST,
	TRAINER_LEAVE_DELETE_SUCCESS,
	TRAINER_LEAVE_LIST_FAIL,
	TRAINER_LEAVE_LIST_REQUEST,
	TRAINER_LEAVE_LIST_SUCCESS,
	TRAINER_LEAVE_UPDATE_FAIL,
	TRAINER_LEAVE_UPDATE_REQUEST,
	TRAINER_LEAVE_UPDATE_SUCCESS,
	ADMIN_CONFIRM_LEAVE_LIST_FAIL,
	ADMIN_CONFIRM_LEAVE_LIST_REQUEST,
	ADMIN_CONFIRM_LEAVE_LIST_SUCCESS,
	ADMIN_CONFIRM_LEAVE_UPDATE_FAIL,
	ADMIN_CONFIRM_LEAVE_UPDATE_REQUEST,
	ADMIN_CONFIRM_LEAVE_UPDATE_SUCCESS,
} from "../constants/leaveConstants";

export const TrainerLeaveListReducer = (state = { leave: [] }, action) => {
	switch (action.type) {
		case TRAINER_LEAVE_LIST_REQUEST:
			return { loading: true };
		case TRAINER_LEAVE_LIST_SUCCESS:
			return { loading: false, trainerLeave: action.payload };
		case TRAINER_LEAVE_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const LeaveCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_LEAVE_CREATE_REQUEST:
			return { loading: true };
		case TRAINER_LEAVE_CREATE_SUCCESS:
			return { loading: false, success: true };
		case TRAINER_LEAVE_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const LeaveUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_LEAVE_UPDATE_REQUEST:
			return { loading: true };
		case TRAINER_LEAVE_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case TRAINER_LEAVE_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const LeaveDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case TRAINER_LEAVE_DELETE_REQUEST:
			return { loading: true };
		case TRAINER_LEAVE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case TRAINER_LEAVE_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const AdminConfirmLeaveListReducer = (state = { leave: [] }, action) => {
	switch (action.type) {
		case ADMIN_CONFIRM_LEAVE_LIST_REQUEST:
			return { loading: true };
		case ADMIN_CONFIRM_LEAVE_LIST_SUCCESS:
			return { loading: false, trainerLeave: action.payload };
		case ADMIN_CONFIRM_LEAVE_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const AdminConfirmLeaveUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_CONFIRM_LEAVE_UPDATE_REQUEST:
			return { loading: true };
		case ADMIN_CONFIRM_LEAVE_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case ADMIN_CONFIRM_LEAVE_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
