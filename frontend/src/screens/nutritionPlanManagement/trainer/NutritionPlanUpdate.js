import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNutritionPlanAction, updateNutritionPlanAction } from "../../../actions/nutritionPlanAction";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { authHeader } from "../../../actions/trainerActions";
import swal from "sweetalert";
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

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteNutritionPlanAction(id));
					swal({
						title: "Success!",
						text: "Deleted Nutrition Plan Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/nutritionPlan-trainer-view");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Nutrition Plan",
					type: "error",
				});
			});
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
							marginLeft: 60,
							width: "80%",
							borderWidth: 0,
							padding: 25,
							background: "none",
							borderRadius: 10,
							outline: "none",
						}}
					>
						<Card.Body>
							<br></br>
							<Form onSubmit={updateHandler}>
								{loadingDelete && <Loading />}
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
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
											color: "white",
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
											color: "white",
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
											color: "white",
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
											color: "white",
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
								<Button style={{ fontSize: 20, marginTop: 10, borderRadius: 0 }} type="submit" variant="primary">
									Submit
								</Button>
								<Button
									style={{ fontSize: 20, marginTop: 10, borderRadius: 0 }}
									className="mx-2"
									variant="danger"
									onClick={() => deleteHandler(match.params.id)}
								>
									Delete
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
