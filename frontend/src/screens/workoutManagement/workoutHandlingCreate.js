import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createWorkoutHandlingAction } from "../../actions/workoutActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./workoutHandling.css";

export default function WorkoutHandlingCreate({ history }) {
	const [workoutID, setWorkoutID] = useState("");
	const [name, setName] = useState("");
	const [workoutCategory, setWorkoutCategory] = useState("");
	const [instructions, setInstructions] = useState("");
	const [repetitions, setRepetitions] = useState("");
	const [tips, setTips] = useState("");

	const dispatch = useDispatch();
	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;
	const Workout_Handling_Create = useSelector((state) => state.Workout_Handling_Create);
	const { loading, error } = Workout_Handling_Create;

	const resetHandler = () => {
		setWorkoutID("");
		setName("");
		setWorkoutCategory("");
		setInstructions("");
		setRepetitions("");
		setTips("");
	};

	const submitHandler = (e) => {
		e.preventDefault();
		console.log("hello");
		// if (!workoutID || !name || !workoutCategory || !instructions || !repetitions || !tips) return;
		dispatch(createWorkoutHandlingAction(workoutID, name, workoutCategory, instructions, repetitions, tips));

		resetHandler();
		history.push("/workout-handling-view");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setWorkoutID("06");
		setName("Side Planks");
		setWorkoutCategory("Legs");
		setInstructions(
			"Lie on your side with your knees bent,and prop your upper body up on your elbow then raise your hips off the floor, and hold for 6 seconds"
		);
		setRepetitions("10");
		setTips("Switch to your other side and repeat steps 1 through 5");
	};
	useEffect(() => {}, []);
	if (trainerInfo) {
		return (
			<div className="WorkoutBackgroundCreate">
				<MainScreen title={"CREATE A WORKOUT"}>
					<Button
						variant="success"
						style={{ marginLeft: 10, marginBottom: 6, float: "left", fontSize: 15 }}
						size="lg"
						href="/workout-handling-view"
					>
						Back to workout List
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
							<br></br>

							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="workoutID">
									<Form.Label>Workout ID</Form.Label>
									<Form.Control
										type="workoutID"
										value={workoutID}
										placeholder="Enter the workout ID"
										onChange={(e) => setWorkoutID(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="Name">
									<Form.Label>Workout Name</Form.Label>
									<Form.Control
										value={name}
										placeholder="Enter the workout name"
										// rows={4}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</Form.Group>

								<div className="form-group">
									<label className="WorkoutCategory">Workout Category</label>
									<select className="form-control" onChange={(e) => setWorkoutCategory(e.target.value)} required>
										<option value="Select Workout Category">Select workout category</option>
										<option value="Legs">Legs</option>
										<option value="Chest">Chest</option>
										required
									</select>
								</div>
								<Form.Group controlId="instructions">
									<Form.Label>Instructions</Form.Label>
									<Form.Control
										as="textarea"
										type="instructions"
										value={instructions}
										placeholder="Enter the instruction "
										onChange={(e) => setInstructions(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="repetitions">
									<Form.Label>Repetitions</Form.Label>
									<Form.Control
										type="number"
										value={repetitions}
										min="1"
										max="20"
										onChange={(e) => setRepetitions(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="tips">
									<Form.Label>Tips</Form.Label>
									<Form.Control
										type="tips"
										value={tips}
										placeholder="Enter the tips"
										onChange={(e) => setTips(e.target.value)}
										required
									/>
								</Form.Group>

								<br></br>

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
							<br></br>
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
