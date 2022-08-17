import React, { useState } from "react";
import { Card, CardGroup, Form } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./calculateBMI.css";

export default function CalculateBMIScreen() {
	const [height, setHeight] = useState(null);
	const [weight, setWeight] = useState(null);

	const [bmiResult, setBmiResult] = useState(null);

	const [status, setStatus] = useState("");

	function calculateBMI() {
		let bmi = Number(weight / (height / 100) ** 2).toFixed(2);
		setBmiResult(bmi);

		let bmiStatus = getStatus(bmi);

		setStatus(bmiStatus);

		setHeight("");
		setWeight("");
	}

	function getStatus(bmi) {
		if (bmi.includes("NaN")) {
			return "Please Enter Details !";
		} else {
			if (bmi < 18.5) return "Underweight";
			else if (bmi >= 18.5 && bmi < 24.9) return "Normal";
			else if (bmi >= 25 && bmi < 29.9) return "Overweight";
			else if (bmi.includes("NaN")) return "Please Enter Details !";
			else return "Obese";
		}
	}

	return (
		<div className="bmiCalculator">
			<MainScreen>
				<CardGroup style={{ padding: 50, border: "none", background: "#1058ff00" }}>
					<Card style={{ padding: 50, border: "none", background: "#1058ff00" }}>
						<div className="frame">
							<form className="form-login">
								<h1 className="text-center mb-4 text-xl" style={{ color: "white" }}>
									{" "}
									BMI Calculator
								</h1>
								<br></br>
								<Form.Group controlId="customerFormBasicHeight">
									<Form.Label style={{ color: "white" }}>Height (cm)</Form.Label>
									<Form.Control
										type="text"
										value={height}
										placeholder="Enter Height In Centimeters"
										onChange={(e) => setHeight(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="customerFormBasicWeight">
									<Form.Label style={{ color: "white" }}>Weight (kg)</Form.Label>
									<Form.Control
										type="text"
										value={weight}
										placeholder="Enter Weight In Kilograms"
										onChange={(e) => setWeight(e.target.value)}
										required
									/>
								</Form.Group>
								<div>
									<br></br>
									<button
										className="btn-animate"
										style={{ display: "flex", justifyContent: "center" }}
										type="button"
										onClick={calculateBMI}
									>
										Calculate BMI
									</button>
								</div>

								{bmiResult && (
									<div className="mt-4">
										<br /> <br /> <br />
										<p style={{ color: "white", padding: 5 }}>{bmiResult} </p>
										<p style={{ color: "white", padding: 5 }}>{status}</p>
									</div>
								)}
							</form>
						</div>
					</Card>
				</CardGroup>
			</MainScreen>
		</div>
	);
}
