import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateNutritionPlanAction } from "../../../actions/nutritionPlanAction";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { authHeader } from "../../../actions/trainerActions";
import MainScreen from "../../../components/MainScreen";
import "./nutritionPlanTrainer.css";

export default function NutritionPlanUpdate({ match, history }) {
	const [nic, setNic] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [breakfast, setBreakfast] = useState("Gold");
	const [lunch, setLunch] = useState("Direct");
	const [dinner, setDinner] = useState("");
	const [preWorkoutSnack, setPreWorkoutSnack] = useState("");
	const [dos, setDos] = useState("");
	const [donts, setDonts] = useState("");

	const dispatch = useDispatch();
	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const nutritionPlanUpdate = useSelector((state) => state.nutritionPlanUpdate);
	const { loading, error } = nutritionPlanUpdate;

	const nutritionPlanDelete = useSelector((state) => state.nutritionPlanDelete);
	const { loading: loadingDelete, error: errorDelete } = nutritionPlanDelete;

	const resetHandler = () => {
		setStartDate("");
		setEndDate("");
		setBreakfast("");
		setLunch("");
		setDinner("");
		setPreWorkoutSnack("");
		setDos("");
		setDonts("");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/trainer/nutrition_plan/get/${match.params.id}`, {
				headers: authHeader(),
			});
			setNic(data.nic);
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
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateNutritionPlanAction(
				match.params.id,
				nic,
				startDate,
				endDate,
				breakfast,
				lunch,
				dinner,
				preWorkoutSnack,
				dos,
				donts
			)
		);
		if (!nic || !startDate || !endDate || !breakfast || !lunch || !dinner || !preWorkoutSnack || !dos || !donts) return;
	};
	if (trainerInfo) {
		return (
			<div className="nutritonPlanUpdate">
				<br></br>

				<MainScreen title="Update Nutrition Plan">
					<br></br>
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/nutrition-plan-trainer-view"
					>
						{" "}
						Back to Plan List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							marginLeft: 60,
							width: "80%",
							borderWidth: 0,
							padding: 25,
							outline: "none",
							background: "rgba(231, 238, 238, 0.8)",
							borderRadius: 45,
						}}
					>
						<Card.Body>
							<Form onSubmit={updateHandler}>
								{loadingDelete && <Loading />}
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
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
								<Form.Group controlId="nic">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										NIC
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="nic"
										value={nic}
										readonly
									/>
								</Form.Group>

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
										required
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
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
										required
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
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
											height: 40,
											fontSize: 18,
										}}
										as="textarea"
										type="breakfast"
										value={breakfast}
										onChange={(e) => setBreakfast(e.target.value)}
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
											height: 40,
											fontSize: 18,
										}}
										as="textarea"
										type="lunch"
										value={lunch}
										onChange={(e) => setLunch(e.target.value)}
										required
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
											height: 40,
											fontSize: 18,
										}}
										as="textarea"
										type="dinner"
										value={dinner}
										onChange={(e) => setDinner(e.target.value)}
										required
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
											height: 40,
											fontSize: 18,
										}}
										as="textarea"
										type="preWorkoutSnack"
										value={preWorkoutSnack}
										onChange={(e) => setPreWorkoutSnack(e.target.value)}
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
											height: 40,
											fontSize: 18,
										}}
										as="textarea"
										type="dos"
										value={dos}
										onChange={(e) => setDos(e.target.value)}
										required
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
											height: 40,
											fontSize: 18,
										}}
										as="textarea"
										type="donts"
										value={donts}
										onChange={(e) => setDonts(e.target.value)}
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button style={{ fontSize: 20, marginTop: 10 }} type="submit" variant="primary">
									Submit
								</Button>
								<Button
									style={{ fontSize: 20, marginTop: 10 }}
									className="mx-2"
									variant="danger"
									onClick={resetHandler}
								>
									Reset
								</Button>
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
			</div>
		);
	}
}
