import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	adminLoginReducer,
	adminRegisterReducer,
	adminViewReducer,
	adminUpdateReducer,
} from "./reducers/adminReducers";

import {
	trainerLoginReducer,
	trainerRegisterReducer,
	trainerViewReducer,
	trainerUpdateReducer,
	trainerListReducer,
	trainerViewByIdReducer,
	trainerUpdateByIdReducer,
	trainerDeleteReducer,
} from "./reducers/trainerReducers";

import {
	customerLoginReducer,
	customerRegisterReducer,
	customerViewReducer,
	customerUpdateReducer,
	customerListReducer,
	customerListForTrainerReducer,
	customerViewByIdReducer,
	customerUpdateByIdReducer,
	customerDeleteReducer,
} from "./reducers/customerReducers";

import {
	nutritionPlanCreateReducer,
	nutritionPlanListReducer,
	nutritionPlanUpdateReducer,
	nutritionPlanDeleteReducer,
	nutritionPlanListAdminReducer,
} from "./reducers/nutritionPlanReducer";

const reducer = combineReducers({
	admin_Login: adminLoginReducer,
	adminRegistration: adminRegisterReducer,
	adminView: adminViewReducer,
	adminUpdate: adminUpdateReducer,
	trainer_Login: trainerLoginReducer,
	trainerRegistration: trainerRegisterReducer,
	trainerView: trainerViewReducer,
	trainerUpdate: trainerUpdateReducer,
	trainerList: trainerListReducer,
	trainerDelete: trainerDeleteReducer,
	trainerViewById: trainerViewByIdReducer,
	trainerUpdateById: trainerUpdateByIdReducer,
	customer_Login: customerLoginReducer,
	customerRegistration: customerRegisterReducer,
	customerView: customerViewReducer,
	customerUpdate: customerUpdateReducer,
	customerList: customerListReducer,
	customerListForTrainer: customerListForTrainerReducer,
	customerDelete: customerDeleteReducer,
	customerViewById: customerViewByIdReducer,
	customerUpdateById: customerUpdateByIdReducer,
	nutritionPlanList: nutritionPlanListReducer,
	nutritionPlanCreate: nutritionPlanCreateReducer,
	nutritionPlanUpdate: nutritionPlanUpdateReducer,
	nutritionPlanDelete: nutritionPlanDeleteReducer,
	nutritionPlanAdminList: nutritionPlanListAdminReducer,
});

const adminInfoFromStorage = localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null;

const trainerInfoFromStorage = localStorage.getItem("trainerInfo")
	? JSON.parse(localStorage.getItem("trainerInfo"))
	: null;

const customerInfoFromStorage = localStorage.getItem("customerInfo")
	? JSON.parse(localStorage.getItem("customerInfo"))
	: null;

const initialState = {
	admin_Login: { adminInfo: adminInfoFromStorage },
	trainer_Login: { trainerInfo: trainerInfoFromStorage },
	customer_Login: { customerInfo: customerInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
