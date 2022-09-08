import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authHeader } from "../../../actions/customerActions";
import MainScreen from "../../../components/MainScreen";
import { Link } from "react-router-dom";
import "./nutritionPlanCustomer.css";

export default function NutritionPlanCustomerView({ match, history }) {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [breakfast, setBreakfast] = useState("");
	const [lunch, setLunch] = useState("");
	const [dinner, setDinner] = useState("");
	const [preWorkoutSnack, setPreWorkoutSnack] = useState("");
	const [dos, setDos] = useState("");
	const [donts, setDonts] = useState("");

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/customer/nutrition_plan/${customerInfo._id}`, {
				headers: authHeader(),
			});
			setStartDate(data.startDate);
			setEndDate(data.endDate);
			setBreakfast(data.breakfast);
			setLunch(data.lunch);
			setDinner(data.dinner);
			setPreWorkoutSnack(data.preWorkoutSnack);
			setDos(data.dos);
			setDonts(data.donts);
		};

		fetching();
	});

	if (customerInfo) {
		return (
			<div className="nutritonPlanView">
				<br></br>
				<MainScreen title="My Nutrition Plan">
					<br></br>
					<br></br>
					<Row>
						<Col>
							<Link to="/progress-customer-report">
								<Button
									style={{
										padding: "8px",
										fontSize: "15px",
										fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
										width: "150px",
										backgroundColor: "#29C379",
										borderBlockColor: "#4D5551",
										color: "#000000",
										fontWeight: 700,
										marginLeft: 820,
									}}
									variant="primary"
									className="logoutBtn"
									href="/progress-customer-report"
								>
									My Progress
								</Button>
							</Link>
						</Col>
					</Row>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "80%",
							borderWidth: 0,
							padding: 25,
							outline: "none",
							marginLeft: 60,
							background: "rgba(231, 238, 238, 0.8)",
							borderRadius: 45,
						}}
					>
						<Card.Body>
							<Form>
								<h2
									style={{
										color: "#00995d",
										fontStyle: "bold",
										fontSize: 25,
									}}
								>
									Plan Detail
								</h2>
								<hr
									style={{
										backgroundColor: "#29C379",
										borderWidth: 5.0,
									}}
								></hr>

								<Form.Group controlId="startdate">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Start Date
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="date"
										value={startDate}
										readonly
									/>
								</Form.Group>

								<Form.Group controlId="enddate">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										End Date
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="date"
										value={endDate}
										readonly
									/>
								</Form.Group>
								<br></br>
								<h2
									style={{
										color: "#00995d",
										fontStyle: "bold",
										fontSize: 25,
									}}
								>
									Meal Detail
								</h2>
								<hr
									style={{
										backgroundColor: "#29C379",
										borderWidth: 5.0,
									}}
								></hr>

								<Form.Group controlId="breakfast">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Breakfast
									</Form.Label>
									<Form.Control
										style={{
											height: 70,
											fontSize: 18,
										}}
										as="textarea"
										type="breakfast"
										value={breakfast}
										readonly
										required
									/>
								</Form.Group>

								<Form.Group controlId="lunch">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Lunch
									</Form.Label>
									<Form.Control
										style={{
											height: 70,
											fontSize: 18,
										}}
										as="textarea"
										type="lunch"
										value={lunch}
										readonly
									/>
								</Form.Group>
								<Form.Group controlId="dinner">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Dinner
									</Form.Label>
									<Form.Control
										style={{
											height: 70,
											fontSize: 18,
										}}
										as="textarea"
										type="dinner"
										value={dinner}
										readonly
									/>
								</Form.Group>
								<Form.Group controlId="preWorkoutSnack">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Pre Workout Snack
									</Form.Label>
									<Form.Control
										style={{
											height: 70,
											fontSize: 18,
										}}
										as="textarea"
										type="preWorkoutSnack"
										value={preWorkoutSnack}
										readonly
									/>
								</Form.Group>
								<br></br>
								<h2
									style={{
										color: "#00995d",
										fontStyle: "bold",
										fontSize: 25,
									}}
								>
									Additional Detail
								</h2>
								<hr
									style={{
										backgroundColor: "#29C379",
										borderWidth: 5.0,
									}}
								></hr>

								<Form.Group controlId="dos">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Dos
									</Form.Label>
									<Form.Control
										style={{
											height: 70,
											fontSize: 18,
										}}
										as="textarea"
										type="dos"
										value={dos}
										readonly
									/>
								</Form.Group>
								<Form.Group controlId="donts">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Donts
									</Form.Label>
									<Form.Control
										style={{
											height: 70,
											fontSize: 18,
										}}
										as="textarea"
										type="donts"
										value={donts}
										readonly
									/>
								</Form.Group>
							</Form>
						</Card.Body>
					</Card>
					<br></br>
					<br></br>
					<br></br>
				</MainScreen>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
				<br></br>
			</div>
		);
	}
}
