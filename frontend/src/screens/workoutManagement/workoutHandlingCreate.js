import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createWorkoutHandlingAction } from "../../actions/workoutActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./workoutHandling.css" ;

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
	const WorkoutHandlingCreate = useSelector((state) => state.WorkoutHandlingCreate);
	const { loading, error, workoutHandling } = WorkoutHandlingCreate;

	console.log(workoutHandling);

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

		if (!workoutID || !name || !workoutCategory || !instructions || !repetitions || !tips) return;
		dispatch(createWorkoutHandlingAction(workoutID, name, workoutCategory, instructions, repetitions, tips));

		resetHandler();
		history.push("/workout-Handling-View");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
			setWorkoutID("101");
			setName("Jumping jack");
			setWorkoutCategory("chest");
			setInstructions("do it");
			setRepetitions("10");
			setTips("use ur legs");
		
	};
	useEffect(() => {}, []);
	if (trainerInfo) {
		return (
			<div className="WorkoutBackgroundCreate">
				{" "}
				<MainScreen title={"CREATE A WORKOUT"}>
					<Button
						style={{
							float: "left",
							fontSize: 15,
							marginLeft: 10,
						}}
						href="/workout-Handling-View"
					>
						{" "}
						Back to workout List
					</Button>
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
						<Card.Header
							style={{
								borderRadius: 45,
								borderWidth: 2.0,
								marginTop: 20,
								paddingInline: 10,
								background: "white",
							}}
						>
							<div className="Sheader">
								{" "}
								<h3>Create a New Workout</h3>
							</div>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="workoutID">
									<Form.Label>WORKOUT ID</Form.Label>
									<Form.Control
										type="workoutID"
										value={workoutID}
										placeholder="Enter the NIC"
										onChange={(e) => setWorkoutID(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="Name">
									<Form.Label>Workout Name</Form.Label>
									<Form.Control
										value={name}
										placeholder="Enter the workout name"
										rows={4}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</Form.Group>

								<div className="form-group">
									<label className="WorkoutCategory">Workout Category</label>
									<select
										className="form-control"
										id="WorkoutCategory"
										value={workoutCategory}
										onChange={(e) => setWorkoutCategory(e.target.value)}
										required
									>
										<option>Select Workout Category</option>
										<option value={workoutCategory.Legs}>Legs</option>
										<option value={workoutCategory.Chest}>Chest</option>
									</select>
								</div>

								<Form.Group controlId="instructions">
									<Form.Label>Instructions</Form.Label>
									<Form.Control
										type="instructions"
										value={instructions}
										placeholder="Enter the Instruction "
										onChange={(e) => setInstructions(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="repetitions">
									<Form.Label>Repetitions</Form.Label>
									<Form.Control
										type=""
										value={repetitions}
										placeholder=""
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

								<Button type="submit" variant="primary">
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
