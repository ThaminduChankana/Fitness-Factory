import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNutritionPlanAction } from "../../../actions/nutritionPlanAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import "./nutritionPlanTrainer.css";

export default function NutritionPlanCreate({ history }) {
	const [nic, setNic] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [breakfast, setBreakfast] = useState("");
	const [lunch, setLunch] = useState("");
	const [dinner, setDinner] = useState("");
	const [preWorkoutSnack, setPreWorkoutSnack] = useState("");
	const [dos, setDos] = useState("");
	const [donts, setDonts] = useState("");

	const dispatch = useDispatch();
	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const nutritionPlanCreate = useSelector((state) => state.nutritionPlanCreate);
	const { loading, error } = nutritionPlanCreate;

	const resetHandler = () => {
		setNic("");
		setStartDate("");
		setEndDate("");
		setBreakfast("");
		setLunch("");
		setDinner("");
		setPreWorkoutSnack("");
		setDos("");
		setDonts("");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setNic("997193244V");
		setBreakfast("Oats Banana Pancakes with Protein Shake");
		setLunch("Multigrain roti along with palak chicken and Avocado bell pepper salad");
		setDinner("Brown rice, peas paneer curry, sprouts vegetable salad");
		setPreWorkoutSnack("Bananas");
		setDos("Consume all 3 macronutrients");
		setDonts("Skip meals, especially in the lead up to or after a workout");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(createNutritionPlanAction(nic, startDate, endDate, breakfast, lunch, dinner, preWorkoutSnack, dos, donts));

		resetHandler();
	};

	useEffect(() => {}, []);
	if (trainerInfo) {
		return (
			<div className="trainerNutritionPlanCreate">
				<br></br>
				<MainScreen title="Nutrition Plan">
					<br></br>
					<br></br>
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
						}}
						variant="primary"
						className="logoutBtn"
						href="/nutritionPlan-trainer-view"
					>
						Back To List
					</Button>
					<Card
						style={{
							width: "80%",
							borderWidth: 0,
							padding: 25,
							background: "none",
							borderRadius: 10,
							outline: "none",
							marginLeft: 60,
						}}
					>
						<Card.Body>
							<br></br>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<h2
									style={{
										color: "#29C379",
										fontStyle: "bold",
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

								<Form.Group controlId="nic">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
										}}
									>
										User NIC
									</Form.Label>
									<Form.Control
										type="nic"
										value={nic}
										placeholder="Enter the NIC"
										onChange={(e) => setNic(e.target.value)}
										required
										style={{
											height: 40,
											fontSize: 18,
										}}
									/>
								</Form.Group>

								<Form.Group controlId="startdate">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
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
										required
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="enddate">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
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
										required
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								<h2
									style={{
										color: "#29C379",
										fontStyle: "bold",
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
											color: "white",
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
										placeholder="Enter the Breakfast"
										onChange={(e) => setBreakfast(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="lunch">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
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
										placeholder="Enter the Lunch"
										onChange={(e) => setLunch(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="dinner">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
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
										placeholder="Enter the Dinner"
										onChange={(e) => setDinner(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="preWorkoutSnack">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
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
										placeholder="Enter the Pre Workout Snack"
										onChange={(e) => setPreWorkoutSnack(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								<h2
									style={{
										color: "#29C379",
										fontStyle: "bold",
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
											color: "white",
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
										placeholder="Enter the Dos"
										onChange={(e) => setDos(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="donts">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
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
										placeholder="Enter the Donts"
										onChange={(e) => setDonts(e.target.value)}
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button style={{ fontSize: 20, marginTop: 10, borderRadius: 0 }} type="submit" variant="primary">
									Submit
								</Button>
								<Button
									style={{ fontSize: 20, marginTop: 10, borderRadius: 0 }}
									className="mx-2"
									onClick={resetHandler}
									variant="danger"
								>
									Reset
								</Button>
								<Button
									variant="info"
									onClick={demoHandler}
									style={{
										fontSize: 20,
										marginTop: 10,
										borderRadius: 0,
									}}
								>
									Demo
								</Button>
							</Form>
						</Card.Body>
						<br></br>
					</Card>
				</MainScreen>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
}
