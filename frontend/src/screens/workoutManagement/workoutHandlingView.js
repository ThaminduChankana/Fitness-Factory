import { useHistory } from "react-router-dom";
import { Accordion, Card, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkoutHandlingAction, listWorkoutHandling } from "../../actions/workoutActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./workoutHandling.css";
import swal from "sweetalert";

export default function WorkoutHandlingView({ search }) {
	const dispatch = useDispatch();
	const trainer_Login = useSelector((state) => state.trainer_Login);

	const { trainerInfo } = trainer_Login;
	const list_Workout_Handling = useSelector((state) => state.list_Workout_Handling);
	const { loading, workouts, error } = list_Workout_Handling;

	const workoutHandlingUpdate = useSelector((state) => state.workoutHandlingUpdate);
	const { success: successUpdate } = workoutHandlingUpdate;

	const WorkoutHandlingDelete = useSelector((state) => state.WorkoutHandlingDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = WorkoutHandlingDelete;
	console.log(workouts);

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
					dispatch(deleteWorkoutHandlingAction(id));
					swal({
						title: "Success!",
						text: "Deleted Workout Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete workout",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(listWorkoutHandling());
	}, [dispatch,  trainerInfo, successUpdate, successDelete, history]);
	if (trainerInfo) {
		return (
			<div className="WorkoutBackgroundView">
				<MainScreen title={`Welcome Back ${trainerInfo && trainerInfo.name}..`}>
					<h1>Doctor's Workout List</h1>

					<br></br>
					<ButtonGroup className="mb-2" size="lg" style={{ width: "100%" }}>
						<Button href="/admin">Back to operations page</Button>

						<Button href="/workout-Handling-Create">+ Workout Create</Button>

						<Button href="/workout-Report"> Workout Report Generate</Button>
					</ButtonGroup>
					<br></br>
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<br></br>

					{workouts &&
						workouts.map((workout) => (
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
											background: "rgba(255, 255, 255)",
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
											<Accordion.Toggle
												as={Card.Text}
												variant="link"
												eventKey="0"
												style={{ paddingInline: 20, marginTop: 10, marginBottom: 10 }}
											>
												Workout ID : {workout.workoutID}
												<br></br>
												Name : {workout.name}
											</Accordion.Toggle>
										</span>
										<div>
											<Button style={{ marginTop: 20, fontSize: 15 }} href={`/workoutHandling/${workout._id}`}>
												Edit
											</Button>
										</div>
										&emsp;
										<div>
											<Button
												style={{ marginTop: 20, fontSize: 15 }}
												variant="danger"
												className="mx-2"
												onClick={() => deleteHandler(workout._id)}
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
												<Col md={6}>
													<h5> Workout ID : {workout.workoutID}</h5>
													<h5> Workout name :{workout.name}</h5>
													<h5> workoutCategory: {workout.workoutCategory}</h5>
													<h5> instructions: {workout.instructions}</h5>
													<h5> repetitions: {workout.repetitions}</h5>
													<h5>tips : {workout.tips}</h5>
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
