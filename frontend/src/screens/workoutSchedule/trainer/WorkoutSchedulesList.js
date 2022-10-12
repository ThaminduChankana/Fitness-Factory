import { useHistory } from "react-router-dom";
import { Form, Card, Button, Accordion, Row, Col, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkoutScheduleAction, listWorkoutSchedule } from "../../../actions/scheduleActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import swal from "sweetalert";
import MainScreen from "../../../components/MainScreen";

export default function WorkoutSchedulesList() {
	const dispatch = useDispatch();

	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const workoutScheduleList = useSelector((state) => state.workout_Schedule_List);
	const { loading, workoutSchedules, error } = workoutScheduleList;

	const workout_Schedule_Update = useSelector((state) => state.workout_Schedule_Update);
	const { success: successUpdate } = workout_Schedule_Update;

	console.log(workoutSchedules);

	const workoutScheduleDelete = useSelector((state) => state.workout_Schedule_Delete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = workoutScheduleDelete;

	const [search, setSearch] = useState("");

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

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
					dispatch(deleteWorkoutScheduleAction(id));
					swal({
						title: "Success!",
						text: "Deleted Workout Plan Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/workout-schedule-view");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Workout schedule Plan",
					type: "error",
				});
			});
	};

	const history = useHistory();

	useEffect(() => {
		dispatch(listWorkoutSchedule());
	}, [dispatch, history, successUpdate, trainerInfo, successDelete]);

	if (trainerInfo) {
		return (
			<div className="WorkoutBackgroundView">
				<MainScreen title={`Welcome Back ${trainerInfo && trainerInfo.name}..`}>
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
								Workout Schedule List
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

					<ButtonGroup variant="success" className="mb-2" size="lg" style={{ width: "100%" }}>
						<Button variant="success" href="/trainer">
							Back to Dashboard
						</Button>

						<Button variant="success" href="/workout-schedule-create">
							+ Schedule Create
						</Button>
					</ButtonGroup>

					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{workoutSchedules &&
						workoutSchedules

							.filter(
								(filteredSchedule) =>
									filteredSchedule.nic.toLowerCase().includes(search.toLowerCase()) ||
									filteredSchedule.nic.includes(search)
							)
							.reverse()

							.map((workoutSchedule) => (
								<Accordion key={workoutSchedule._id}>
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
										key={workoutSchedules._id}
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
												style={{
													color: "black",
													textDecoration: "none",
													flex: 1,
													cursor: "pointer",
													alignSelf: "center",
													fontSize: 18,
												}}
											>
												<Accordion.Toggle
													as={Card.Text}
													variant="link"
													eventKey="0"
													style={{ paddingInline: 20, marginTop: 10, marginBottom: 10 }}
												>
													NIC : {workoutSchedule.nic}
													<br></br>
												</Accordion.Toggle>
											</span>
											<div>
												<Button
													style={{ marginTop: 8, fontSize: 15 }}
													href={`/workout-schedule/${workoutSchedule._id}`}
												>
													Edit
												</Button>
											</div>
											&emsp;
											<div>
												<Button
													style={{ marginTop: 6, fontSize: 15 }}
													variant="danger"
													className="mx-2"
													onClick={() => deleteHandler(workoutSchedule._id)}
												>
													Delete
												</Button>
											</div>
											<br></br>
											<br></br>
										</Card.Header>
										<Accordion.Collapse eventKey="0">
											<Card.Body>
												<Row>
													<Col md={4}>
														<h5> NIC : {workoutSchedule.nic}</h5>
														<h5> Pre-Workout : {workoutSchedule.PreWorkout}</h5>
														<h5> Main-Workout :{workoutSchedule.MainWorkout}</h5>
														<h5> Post-Workout: {workoutSchedule.PostWorkout}</h5>
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
