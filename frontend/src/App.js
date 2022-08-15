import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

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

const App = () => {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
};

export default App;
