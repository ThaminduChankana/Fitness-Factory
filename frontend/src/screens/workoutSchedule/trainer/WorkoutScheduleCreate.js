import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createWorkoutScheduleAction } from "../../../actions/scheduleActions";
import MainScreen from "../../../components/MainScreen";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import "./workoutschedule.css";

export default function WorkoutScheduleCreate({ history }) {
	const [ScheduleID, setScheduleID] = useState("");
	const [nic, setNic] = useState("");
	const [PreWorkout, setPreWorkout] = useState("");
	const [MainWorkout, setMainWorkout] = useState("");
	const [PostWorkout, setPostWorkout] = useState("");

	const dispatch = useDispatch();
	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const workout_Schedule_Create = useSelector((state) => state.workout_Schedule_Create);
	const { loading, error } = workout_Schedule_Create;

	const resetHandler = () => {
		setScheduleID("");
		setNic("");
		setPreWorkout("");
		setMainWorkout("");
		setPostWorkout("");
	};
	const demoHandler = async (e) => {
		e.preventDefault();

		setScheduleID("skyle34");
		setNic("789");
		setPreWorkout("Shifted Maximum Pre-Workout");
		setMainWorkout("Reverse Lunge ,Abdominal Crunches");
		setPostWorkout("Drink water & Eat banana and yogurts");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(createWorkoutScheduleAction(ScheduleID, nic, PreWorkout, MainWorkout, PostWorkout));
		resetHandler();
		history.push("/workout-schedule-view");
	};

	useEffect(() => {}, []);
	if (trainerInfo) {
		return (
			<div className="trainerWorkoutScheduleCreate">
				<br></br>
				<MainScreen title="Create Schedule Plan">
					<br></br>
					<br></br>
					<Button
						variant="success"
						style={{ marginLeft: 10, marginBottom: 6, float: "left", fontSize: 15 }}
						size="lg"
						href="/workout-schedule-view"
					>
						Back to Schedule List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							margin: 50,
							marginLeft: "10%",
							marginRight: "0%",
							width: "80%",
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<Card.Body>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

								<br></br>

								<Form.Group controlId="ScheduleID">
									<Form.Label>Schedule-ID</Form.Label>
									<br></br>
									<Form.Control
										type="ScheduleID"
										value={ScheduleID}
										placeholder="Enter the Schedule-ID "
										onChange={(e) => setScheduleID(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="nic">
									<Form.Label>NIC-ID</Form.Label>
									<Form.Control
										type="nic"
										value={nic}
										placeholder="Enter the NIC"
										onChange={(e) => setNic(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="nic">
									<Form.Label>Pre-Workout</Form.Label>
									<Form.Control
										type=""
										value={PreWorkout}
										placeholder="Enter the Pre-Workout"
										onChange={(e) => setPreWorkout(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="MainWorkout">
									<Form.Label>Main-Workout</Form.Label>
									<Form.Control
										type=""
										value={MainWorkout}
										placeholder="Enter the Main-Workout"
										onChange={(e) => setMainWorkout(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="Post-Workout">
									<Form.Label>Post-Workout</Form.Label>
									<Form.Control
										type=""
										value={PostWorkout}
										placeholder="Enter the Post-Workout"
										onChange={(e) => setPostWorkout(e.target.value)}
										required
									/>
								</Form.Group>

								{loading && <Loading size={50} />}

								<Button type="submit" variant="success">
									Submit
								</Button>

								<Button className="mx-2" onClick={resetHandler} variant="danger">
									Reset
								</Button>
								<Button variant="info" onClick={demoHandler}>
									Demo
								</Button>
							</Form>
						</Card.Body>
					</Card>
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
