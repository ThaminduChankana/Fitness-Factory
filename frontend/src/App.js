import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

import AdminRegisterScreen from "./screens/userManagement/register/AdminRegisterScreen";
import TrainerRegisterScreen from "./screens/userManagement/register/TrainerRegisterScreen";
import CustomerRegisterScreen from "./screens/userManagement/register/CustomerRegisterScreen";

const App = () => {
	return (
		<BrowserRouter>
			<Route path="/admin-register" component={AdminRegisterScreen} exact />
			<Route path="/trainer-register" component={TrainerRegisterScreen} exact />
			<Route path="/customer-register" component={CustomerRegisterScreen} exact />
		</BrowserRouter>
	);
};

export default App;
