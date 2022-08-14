import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

import AdminRegisterScreen from "./screens/userManagement/register/AdminRegisterScreen";
import TrainerRegisterScreen from "./screens/userManagement/register/TrainerRegisterScreen";

const App = () => {
	return (
		<BrowserRouter>
			<Route path="/admin-register" component={AdminRegisterScreen} exact />
			<Route path="/trainer-register" component={TrainerRegisterScreen} exact />
		</BrowserRouter>
	);
};

export default App;
