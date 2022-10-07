import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { createTrainerLeaveAction } from "../../../actions/leaveActions";
import MainScreen from "../../../components/MainScreen";
import "./trainerCreateLeave.css";

const TrainerCreateLeave = () => {
	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;
	const [fullName, setfullName] = useState(trainerInfo.name);
	const [nic, setnic] = useState(trainerInfo.nic);
	const [division, setdivision] = useState("");
	const [number_of_days, setnumber_of_days] = useState("");
	const [date_for_commencing_leave, setdate_for_commencing_leave] = useState("");
	const [date_for_resuming_duties, setdate_for_resuming_duties] = useState("");
	const [reasons_for_leave, setreasons_for_leave] = useState("");

	const dispatch = useDispatch();
	const leaveCreate = useSelector((state) => state.leaveCreate);
	const { loading, error } = leaveCreate;

	const submitHandler = async (e) => {
		e.preventDefault();
		dispatch(
			createTrainerLeaveAction(
				fullName,
				nic,
				division,
				number_of_days,
				date_for_commencing_leave,
				date_for_resuming_duties,
				reasons_for_leave
			)
		);
		if (
			!fullName ||
			!nic ||
			!division ||
			!number_of_days ||
			!date_for_commencing_leave ||
			!date_for_resuming_duties ||
			!reasons_for_leave
		)
			return;
	};

	const demoHandler = async (e) => {
		e.preventDefault();

		setdivision("Sick");
		setnumber_of_days("5");
		setdate_for_commencing_leave("2022-03-09");
		setdate_for_resuming_duties("2022-03-13");
		setreasons_for_leave("I got sick");
	};

	const resetHandler = async (e) => {
		e.preventDefault();

		setdivision("");
		setnumber_of_days("");
		setdate_for_commencing_leave("");
		setdate_for_resuming_duties("");
		setreasons_for_leave("");
	};

	if (trainerInfo) {
		return (
			<div className="trainerLeaveCreateBg">
				<br></br>
				<MainScreen title="TRAINER LEAVE APPLICATION">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/trainer-leaves"
					>
						{" "}
						Back to Trainers Leave List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "80%",
							borderWidth: 0,
							padding: 25,
							outline: "none",
							marginLeft: 60,
							background: "rgba(231, 238, 238, 0.8)",
							borderRadius: 45,
						}}
					>
						<div className="LeaveContainer">
							<br></br>
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

								{loading && <Loading />}
							</div>
							<br></br>

							<Form onSubmit={submitHandler}>
								<Form.Group controlId="Name">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Full Name
									</Form.Label>
									<Form.Control
										type="name"
										value={fullName}
										placeholder="Enter name"
										onChange={(e) => setfullName(e.target.value)}
										required
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<Form.Group controlId="Nic">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										NIC
									</Form.Label>
									<Form.Control
										type="text"
										value={nic}
										placeholder="Enter NIC"
										onChange={(e) => setnic(e.target.value)}
										required
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<div className="form-group">
									<label
										style={{
											fontSize: 25,
										}}
										className="division"
									>
										Division
									</label>
									<select
										style={{
											height: 45,
											fontSize: 18,
										}}
										className="form-control"
										id="trainerdivision"
										value={division}
										onChange={(e) => setdivision(e.target.value)}
										required
									>
										<option>Select division</option>
										<option value={division.Sick}>Sick</option>
										<option value={division.Annual}>Annual</option>
										<option value={division.Duty}>Duty</option>
										<option value={division.Maternity}>Maternity</option>
										<option value={division.lieu}>lieu</option>
									</select>
								</div>
								<Form.Group controlId="trainerapplydate">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Number of days leave apply
									</Form.Label>
									<Form.Control
										style={{
											height: 45,
											fontSize: 18,
										}}
										type="number"
										value={number_of_days}
										placeholder="Enter Number"
										onChange={(e) => setnumber_of_days(e.target.value)}
										required
										maxLength={10}
									/>
								</Form.Group>
								<Form.Group controlId="trainercmdate">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Date for commencing leave
									</Form.Label>
									<Form.Control
										style={{
											height: 45,
											fontSize: 18,
										}}
										type="date"
										required
										value={date_for_commencing_leave}
										placeholder="Enter date"
										onChange={(e) => setdate_for_commencing_leave(e.target.value)}
									/>
								</Form.Group>
								<Form.Group controlId="date">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Date for resuming duties
									</Form.Label>
									<Form.Control
										type="date"
										value={date_for_resuming_duties}
										onChange={(e) => setdate_for_resuming_duties(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="reason">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Reasons for leave
									</Form.Label>
									<Form.Control
										as="textarea"
										value={reasons_for_leave}
										placeholder="Enter Reason"
										onChange={(e) => setreasons_for_leave(e.target.value)}
										style={{
											height: 80,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<Button
									variant="primary"
									type="submit"
									style={{
										fontSize: 20,
										marginTop: 10,
									}}
								>
									Create
								</Button>
								&emsp;
								<Button
									variant="danger"
									onClick={resetHandler}
									style={{
										fontSize: 20,
										marginTop: 10,
									}}
								>
									Reset
								</Button>
								&emsp;
								<Button
									variant="info"
									onClick={demoHandler}
									style={{
										fontSize: 20,
										marginTop: 10,
									}}
								>
									Demo
								</Button>
							</Form>

							<br></br>
						</div>
					</Card>
					<br></br>
				</MainScreen>
				<br></br>
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
};

export default TrainerCreateLeave;
