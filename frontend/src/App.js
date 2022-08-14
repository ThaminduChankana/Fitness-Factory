import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

import AdminRegister from "./screens/userManagement/register/AdminRegister";

const App = () => {
	return (
		<BrowserRouter>
			<Route path="/" component={AdminRegister} exact />
		</BrowserRouter>
	);
};

export default App;
