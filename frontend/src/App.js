import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

import AdminRegisterScreen from "./screens/userManagement/register/AdminRegisterScreen";

const App = () => {
	return (
		<BrowserRouter>
			<Route path="/" component={AdminRegisterScreen} exact />
		</BrowserRouter>
	);
};

export default App;
