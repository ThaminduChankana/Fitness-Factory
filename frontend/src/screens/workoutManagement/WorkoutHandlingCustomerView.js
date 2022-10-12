import { Accordion, Card, Button, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listWorkoutHandlingCustomer } from "../../actions/workoutActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./workoutHandling.css";

export default function WorkoutHandlingCustomerView() {
	const dispatch = useDispatch();

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const workout_Customer_List = useSelector((state) => state.workout_Customer_List);
	const { loading, workouts, error } = workout_Customer_List;

	const [search, setSearch] = useState("");

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	useEffect(() => {
		dispatch(listWorkoutHandlingCustomer());
	}, [dispatch, customerInfo]);
	if (customerInfo) {
		return (
			<div className="WorkoutBackgroundView">
				<MainScreen>
					<Row>
						<Col>
							<h1
								style={{
									display: "flex",
									marginLeft: "10px",
									width: "500px",
									color: "azure",
									fontStyle: "italic",
								}}
							>
								Workouts List For Customer
							</h1>
						</Col>
						<Col>
							<div className="search" style={{ marginTop: 5, marginLeft: 150 }}>
								<Form inline>
									<input
										type="text"
										placeholder="Search..."
										style={{
											width: 400,
											height: 40,
											borderRadius: 50,
											padding: "10px",
											paddingLeft: "15px",
											fontSize: 18,
										}}
										onChange={searchHandler}
									/>
								</Form>
							</div>
						</Col>
					</Row>
					<br></br>
					<br></br>

					<Button variant="success" href="/customer">
						Back to Dashboard
					</Button>

					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<br></br>

					{workouts &&
						workouts
							.filter(
								(filteredWorkout) =>
									filteredWorkout.name.toLowerCase().includes(search.toLowerCase()) ||
									filteredWorkout.workoutID.includes(search)
							)
							.reverse()
							.map((workout) => (
								<Accordion key={workout._id}>
									<Card
										style={{
											margin: 10,
											borderRadius: 25,
											borderWidth: 1.0,
											borderColor: "rgb(0,0,0,0.5)",
											marginTop: 20,
											paddingInline: 10,
											background: "rgb(235, 235, 235)",
										}}
										key={workout._id}
									>
										<Card.Header
											style={{
												display: "flex",
												paddingInline: 10,
												borderRadius: 25,
												marginTop: 10,
												marginBottom: 10,
												borderColor: "black",
												background: "#C1D9B7",
											}}
										>
											<span
												// onClick={() => ModelShow(note)}
												style={{
													color: "black",
													textDecoration: "none",
													flex: 1,
													cursor: "pointer",
													alignSelf: "center",
													fontSize: 18,
												}}
											>
												<Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
													Name : {workout.name}
												</Accordion.Toggle>
											</span>
											&emsp;
											<div></div>
											<br></br>
											<br></br>
										</Card.Header>
										<Accordion.Collapse eventKey="0">
											<Card.Body>
												<Row>
													<Col md={6}>
														<h5> Workout-ID : {workout.workoutID}</h5>
														<h5> Workout Name :{workout.name}</h5>
														<h5> Workout Category: {workout.workoutCategory}</h5>
														<h5> Instructions: {workout.instructions}</h5>
														<h5> Repetitions: {workout.repetitions}</h5>
														<h5>Tips : {workout.tips}</h5>
													</Col>
												</Row>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							))}
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
