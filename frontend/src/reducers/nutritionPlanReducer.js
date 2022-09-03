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

export const nutritionPlanListReducer = (state = { nutritionPlans: [] }, action) => {
	switch (action.type) {
		case NUTRITION_PLAN_LIST_TRAINER_REQUEST:
			return { loading: true };
		case NUTRITION_PLAN_LIST_TRAINER_SUCCESS:
			return { loading: false, nutritionPlans: action.payload };
		case NUTRITION_PLAN_LIST_TRAINER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const nutritionPlanListAdminReducer = (state = { nutritionPlansForAdmin: [] }, action) => {
	switch (action.type) {
		case NUTRITION_PLAN_LIST_ADMIN_REQUEST:
			return { loading: true };
		case NUTRITION_PLAN_LIST_ADMIN_SUCCESS:
			return { loading: false, nutritionPlansForAdmin: action.payload };
		case NUTRITION_PLAN_LIST_ADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const nutritionPlanCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case NUTRITION_PLAN_CREATE_TRAINER_REQUEST:
			return { loading: true };
		case NUTRITION_PLAN_CREATE_TRAINER_SUCCESS:
			return { loading: false, success: true };
		case NUTRITION_PLAN_CREATE_TRAINER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const nutritionPlanUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case NUTRITION_PLAN_UPDATE_TRAINER_REQUEST:
			return { loading: true };
		case NUTRITION_PLAN_UPDATE_TRAINER_SUCCESS:
			return { loading: false, success: true };
		case NUTRITION_PLAN_UPDATE_TRAINER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const nutritionPlanDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case NUTRITION_PLAN_DELETE_TRAINER_REQUEST:
			return { loading: true };
		case NUTRITION_PLAN_DELETE_TRAINER_SUCCESS:
			return { loading: false, success: true };
		case NUTRITION_PLAN_DELETE_TRAINER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
