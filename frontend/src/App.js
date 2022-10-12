import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Header from "./components/header/header";
import AdminRegisterScreen from "./screens/userManagement/register/AdminRegisterScreen";
import TrainerRegisterScreen from "./screens/userManagement/register/TrainerRegisterScreen";
import CustomerRegisterScreen from "./screens/userManagement/register/CustomerRegisterScreen";
import AdminViewScreen from "./screens/userManagement/view/AdminViewScreen";
import TrainerViewScreen from "./screens/userManagement/view/TrainerViewScreen";
import CustomerViewScreen from "./screens/userManagement/view/CustomerViewScreen";
import AdminLoginScreen from "./screens/userManagement/login/AdminLoginScreen";
import CustomerLoginScreen from "./screens/userManagement/login/CustomerLoginScreen";
import TrainerLoginScreen from "./screens/userManagement/login/TrainerLoginScreen";
import AdminEditScreen from "./screens/userManagement/edit/AdminEditScreen";
import CustomerEditScreen from "./screens/userManagement/edit/CustomerEditScreen";
import TrainerEditScreen from "./screens/userManagement/edit/TrainerEditScreen";
import CustomerListForTrainerScreen from "./screens/userManagement/trainerUserManagement/customerList";
import TrainerListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/trainerList";
import CustomerListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/customerList";
import TrainerEditByAdminScreen from "./screens/userManagement/adminUserManagement/adminUserEditScreens/TrainerEditByAdminScreen";
import CustomerEditByAdminScreen from "./screens/userManagement/adminUserManagement/adminUserEditScreens/CustomerEditByAdminScreen";
import Footer from "./components/footer/footer";
import AdminDashboardPage from "./screens/static/dashboards/AdminDashboard";
import CalculateBMIScreen from "./screens/static/bmiCalculator/CalculateBMI";
import CustomerDashboardPage from "./screens/static/dashboards/CustomerDashboard";
import TrainerDashboardPage from "./screens/static/dashboards/TrainerDashboard";
import AccessDenied from "./components/AccessDenied";
import Inquiries from "./screens/static/inquiries/Inquiries";
import CustomerPrint from "./screens/reports/CustomerReports/CustomerPrint";
import NutritionPlanCreate from "./screens/nutritionPlanManagement/trainer/NutritionPlanCreate";
import NutritionPlanView from "./screens/nutritionPlanManagement/trainer/NutritionPlanView";
import NutritionPlanUpdate from "./screens/nutritionPlanManagement/trainer/NutritionPlanUpdate";
import NutritionPlanAdminView from "./screens/nutritionPlanManagement/admin/NutritionPlanAdminView";
import NutritionPlanCustomerView from "./screens/nutritionPlanManagement/customer/NutritionPlanCustomerView";
import FaqCreate from "./screens/FaqManagement/customer/FaqCreate";
import FaqView from "./screens/FaqManagement/customer/FaqView";
import FaqUpdate from "./screens/FaqManagement/customer/FaqUpdate";
import FaqTrainerView from "./screens/FaqManagement/trainer/FaqTrainerView";
import FaqTrainerUpdate from "./screens/FaqManagement/trainer/FaqTrainerUpdate";
import AddProgress from "./screens/customerProgressManagement/AddProgress";
import ProgressPrint from "./screens/reports/ProgressReports/ProgressPrint";
import { AboutUs } from "./screens/static/aboutUs/AboutUs";
import LoginSelectorPage from "./screens/static/loginSelector/LoginSelectorPage";
import HomePage from "./screens/static/homePage/HomePage";
import CreateNote from "./screens/notes/CreateNote/CreateNote";
import SingleNote from "./screens/notes/SingleNote/SingleNote";
import Memos from "./screens/notes/MemoList/Memos";
import TrainerLeaveList from "./screens/leaveManagement/TrainerLeaveList/TrainerLeaveList";
import TrainerCreateLeave from "./screens/leaveManagement/TrainerCreateLeave/TrainerCreateLeave";
import TrainerUpdateLeave from "./screens/leaveManagement/TrainerUpdateLeave/TrainerUpdateLeave";
import AdminConfirmLeave from "./screens/leaveManagement/AdminConfirmLeaveList/AdminConfirmLeave";
import AdminConfirmApproveOrReject from "./screens/leaveManagement/AdminConfirmApproveOrReject/AdminConfirmApproveOrReject";
import TrainerLeavePrint from "./screens/reports/AdminConfirmLeaveReports/TrainerLeavePrint";
import TermsAndCondition from "./screens/static/termsAndConditions/TermsAndCondition";
import WorkoutHandlingCreate from "./screens/workoutManagement/workoutHandlingCreate";
import WorkoutHandlingView from "./screens/workoutManagement/WorkoutHandlingView";
import WorkoutHandlingUpdate from "./screens/workoutManagement/workoutHandlingUpdate";
import WorkoutHandlingCustomerView from "./screens/workoutManagement/WorkoutHandlingCustomerView";
import WorkoutScheduleCreate from "./screens/workoutSchedule/trainer/WorkoutScheduleCreate";
import WorkoutScheduleUpdate from "./screens/workoutSchedule/trainer/WorkoutScheduleUpdate";
import WorkoutSchedulesList from "./screens/workoutSchedule/trainer/WorkoutSchedulesList";
import WorkoutScheduleCustomerView from "./screens/workoutSchedule/customer/WorkoutScheduleCustomerView";
import AddTimeSpent from "./screens/customerTimeSpentManagement/AddTimeSpent";
import TimeSpentPrint from "./screens/reports/WorkoutTimeReport/TimeSpentPrint";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Route path="/admin-register" component={AdminRegisterScreen} exact />
				<Route path="/trainer-register" component={TrainerRegisterScreen} exact />
				<Route path="/customer-register" component={CustomerRegisterScreen} exact />
				<Route path="/admin-view" component={AdminViewScreen} exact />
				<Route path="/trainer-view" component={TrainerViewScreen} exact />
				<Route path="/customer-view" component={CustomerViewScreen} exact />
				<Route path="/admin-login" component={AdminLoginScreen} exact />
				<Route path="/customer-login" component={CustomerLoginScreen} exact />
				<Route path="/trainer-login" component={TrainerLoginScreen} exact />
				<Route path="/admin-edit" component={AdminEditScreen} exact />
				<Route path="/customer-edit" component={CustomerEditScreen} exact />
				<Route path="/trainer-edit" component={TrainerEditScreen} exact />
				<Route path="/trainer-customers" component={CustomerListForTrainerScreen} exact />
				<Route path="/admin-trainers" component={TrainerListForAdminScreen} exact />
				<Route path="/admin-customers" component={CustomerListForAdminScreen} exact />
				<Route path="/admin-trainer-edit/:id" component={TrainerEditByAdminScreen} exact />
				<Route path="/admin-customer-edit/:id" component={CustomerEditByAdminScreen} exact />
				<Route path="/admin" component={AdminDashboardPage} exact />
				<Route path="/customer" component={CustomerDashboardPage} exact />
				<Route path="/trainer" component={TrainerDashboardPage} exact />
				<Route path="/access-denied" component={AccessDenied} exact />
				<Route path="/bmi-calculator" component={CalculateBMIScreen} exact />
				<Route path="/contactus" component={Inquiries} exact />
				<Route path="/admin-customer-report" component={CustomerPrint} exact />
				<Route path="/nutrition-plan-create-trainer" component={NutritionPlanCreate} exact />
				<Route path="/nutrition-plan-trainer-view" component={NutritionPlanView} exact />
				<Route path="/nutrition-plan/:id" component={NutritionPlanUpdate} exact />
				<Route path="/nutrition-plan-admin-view" component={NutritionPlanAdminView} exact />
				<Route path="/nutrition-plan-customer-view" component={NutritionPlanCustomerView} exact />
				<Route path="/faq-create-customer" component={FaqCreate} exact />
				<Route path="/faq-customer-view" component={FaqView} exact />
				<Route path="/faq/:id" component={FaqUpdate} exact />
				<Route path="/faq-trainer-view" component={FaqTrainerView} exact />
				<Route path="/faq-trainer/:id" component={FaqTrainerUpdate} exact />
				<Route path="/progress-create-customer" component={AddProgress} exact />
				<Route path="/progress-customer-report" component={ProgressPrint} exact />
				<Route path="/aboutus" component={AboutUs} exact />
				<Route path="/login-select" component={LoginSelectorPage} exact />
				<Route path="/" component={HomePage} exact />
				<Route path="/admin-notes" component={Memos} exact />
				<Route path="/admin-notes/create" component={CreateNote} exact />
				<Route path="/admin-notes-edit/:id" component={SingleNote} exact />
				<Route path="/trainer-leaves" component={TrainerLeaveList} exact />
				<Route path="/trainer-create-leave" component={TrainerCreateLeave} exact />
				<Route path="/trainer-leave/:id" component={TrainerUpdateLeave} exact />
				<Route path="/admin-trainer-leaves" component={AdminConfirmLeave} exact />
				<Route path="/admin-approve-trainer-leave/:id" component={AdminConfirmApproveOrReject} exact />
				<Route path="/admin-trainer-leave-report" component={TrainerLeavePrint} exact />
				<Route path="/terms-and-conditions" component={TermsAndCondition} exact />
				<Route path="/workout-handling-create" component={WorkoutHandlingCreate} exact />
				<Route path="/workout-handling-view" component={WorkoutHandlingView} exact />
				<Route path="/workout-handling/:id" component={WorkoutHandlingUpdate} exact />
				<Route path="/workout-schedule-create" component={WorkoutScheduleCreate} exact />
				<Route path="/workout-schedule-view" component={WorkoutSchedulesList} exact />
				<Route path="/workout-schedule/:id" component={WorkoutScheduleUpdate} exact />
				<Route path="/workout-list-customer" component={WorkoutHandlingCustomerView} exact />
				<Route path="/workout-schedule-customer" component={WorkoutScheduleCustomerView} exact />
				<Route path="/time-create-customer" component={AddTimeSpent} exact />
				<Route path="/time-customer-report" component={TimeSpentPrint} exact />
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
