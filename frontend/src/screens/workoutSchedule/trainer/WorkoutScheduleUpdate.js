import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkouteScheduleAction, deleteWorkoutScheduleAction } from "../../../actions/scheduleActions";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { authHeader } from "../../../actions/trainerActions";
import MainScreen from "../../../components/MainScreen";
import "./workoutschedule.css";

export default function WorkoutScheduleUpdate({ match, history }) {
	const [ScheduleID, setScheduleID] = useState("");
	const [nic, setNic] = useState("");
	const [PreWorkout, setPreWorkout] = useState("");
	const [MainWorkout, setMainWorkout] = useState("");
	const [PostWorkout, setPostWorkout] = useState("");

	const dispatch = useDispatch();
	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const workout_Schedule_Update = useSelector((state) => state.workout_Schedule_Update);
	const { loading, error } = workout_Schedule_Update;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteWorkoutScheduleAction(id));
		}
		history.push("/workout-schedule-view");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/trainer/schedule/get/${match.params.id}`, {
				headers: authHeader(),
			});
			setScheduleID(data.ScheduleID);
			setNic(data.nic);
			setPreWorkout(data.PreWorkout);
			setMainWorkout(data.MainWorkout);
			setPostWorkout(data.PostWorkout);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();

		dispatch(updateWorkouteScheduleAction(match.params.id, ScheduleID, nic, PreWorkout, MainWorkout, PostWorkout));
		if (!ScheduleID || !nic || !PreWorkout || !MainWorkout || !PostWorkout) return;
		history.push("/workout-schedule-view");
	};
	if (trainerInfo) {
		return (
			<div className="WorkoutBackgroundUpdate">
				<MainScreen title={"UPDATE A SCHEDULE"}>
					<Button
						variant="success"
						style={{ marginLeft: 10, marginBottom: 6, float: "left", fontSize: 15 }}
						size="lg"
						href="/workout-schedule-view"
					>
						Back to Workout List
					</Button>
					<br></br>
					<br></br>
					<Card
						style={{
							margin: 50,
							marginLeft: "10%",
							marginRight: "10%",
							width: "80%",
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<br></br>

						<Card.Body>
							<Form onSubmit={updateHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="nic">
									<Form.Label>nic</Form.Label>
									<Form.Control type="" value={nic} onChange={(e) => setNic(e.target.value)} required />
								</Form.Group>

								{/* <Form.Group controlId="nic">
									<Form.Label>ScheduleID</Form.Label>
									<Form.Control type="" value={ScheduleID} onChange={(e) => setScheduleID(e.target.value)} required />
								</Form.Group> */}

								<Form.Group controlId="PreWorkout">
									<Form.Label>Pre-Workout</Form.Label>
									<Form.Control type="" value={PreWorkout} onChange={(e) => setPreWorkout(e.target.value)} required />
								</Form.Group>
								<br></br>
								<Form.Group controlId="MainWorkout">
									<Form.Label>Main-Workout</Form.Label>
									<Form.Control type="" value={MainWorkout} onChange={(e) => setMainWorkout(e.target.value)} required />
								</Form.Group>
								<Form.Group controlId="PostWorkout">
									<Form.Label>Post-Workout</Form.Label>
									<Form.Control type="" value={PostWorkout} onChange={(e) => setPostWorkout(e.target.value)} required />
								</Form.Group>
								<br></br>
								{loading && <Loading size={50} />}
								<Button type="submit" variant="primary">
									Submit
								</Button>
								<Button className="mx-2" variant="danger" onClick={() => deleteHandler(match.params.id)}>
									Delete
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
