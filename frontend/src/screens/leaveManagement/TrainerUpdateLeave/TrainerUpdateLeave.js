import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { updateTrainerLeaveAction } from "../../../actions/leaveActions";
import MainScreen from "../../../components/MainScreen";
import axios from "axios";
import { authHeader } from "../../../actions/trainerActions";
import "./trainerUpdateLeave.css";

export default function TrainerUpdateLeave({ match }) {
	const [fullName, setfullName] = useState("");
	const [nic, setnic] = useState("");
	const [division, setdivision] = useState("");
	const [number_of_days, setnumber_of_days] = useState("");
	const [date_for_commencing_leave, setdate_for_commencing_leave] = useState("");
	const [date_for_resuming_duties, setdate_for_resuming_duties] = useState("");
	const [reasons_for_leave, setreasons_for_leave] = useState("");

	const dispatch = useDispatch();

	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const leaveUpdate = useSelector((state) => state.leaveUpdate);
	const { loading, error } = leaveUpdate;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/trainer/personal/trainer_leave/${match.params.id}`, {
				headers: authHeader(),
			});

			setfullName(data.fullName);
			setnic(data.nic);
			setdivision(data.division);
			setnumber_of_days(data.number_of_days);
			setdate_for_commencing_leave(data.date_for_commencing_leave);
			setdate_for_resuming_duties(data.date_for_resuming_duties);
			setreasons_for_leave(data.reasons_for_leave);
		};

		fetching();
	}, [match.params.id]);

	const resetHandler = async (e) => {
		e.preventDefault();

		setdivision("Select Division");
		setnumber_of_days("");
		setdate_for_commencing_leave("");
		setdate_for_resuming_duties("");
		setreasons_for_leave("");
	};

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateTrainerLeaveAction(
				match.params.id,
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

	if (trainerInfo) {
		return (
			<div className="leaveeditBg">
				<br></br>
				<MainScreen title="TRAINER UPDATE LEAVE DETAILS">
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
						<div className="leavecontainer">
							<br></br>
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

								{loading && <Loading />}
							</div>
							<br></br>

							<Form onSubmit={updateHandler}>
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
										className="trainerdivision"
									>
										Division
									</label>
									<select
										className="form-control"
										value={division}
										onChange={(e) => setdivision(e.target.value)}
										required
										style={{
											height: 45,
											fontSize: 18,
										}}
									>
										<option value="Select Division">Select Division</option>
										<option value="Sick">Sick</option>
										<option value="Annual">Annual</option>
										<option value="Duty">Duty</option>
										<option value="Maternity">Maternity</option>
										<option value="lieu">lieu</option>
									</select>
								</div>
								<Form.Group controlId="date">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Number of days leave apply
									</Form.Label>
									<Form.Control
										type="number"
										value={number_of_days}
										onChange={(e) => setnumber_of_days(e.target.value)}
										required
										style={{
											height: 45,
											fontSize: 18,
										}}
										maxLength={10}
									/>
								</Form.Group>
								<Form.Group controlId="date">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Date for commencing leave
									</Form.Label>
									<Form.Control
										type="date"
										value={date_for_commencing_leave}
										onChange={(e) => setdate_for_commencing_leave(e.target.value)}
										required
										style={{
											height: 45,
											fontSize: 18,
										}}
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
										style={{
											height: 45,
											fontSize: 18,
										}}
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
									Update
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
}
