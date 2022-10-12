import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createtimeSpentAction } from "../../actions/timeSpentAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";

export default function AddTimeSpent({ history }) {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const time_Spent_Create = useSelector((state) => state.time_Spent_Create);
	const { loading, error } = time_Spent_Create;

	const resetHandler = () => {
		setDate("");
		setTime("");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setTime("150");
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createtimeSpentAction(date, time));
		resetHandler();
	};

	useEffect(() => {}, []);
	if (customerInfo) {
		return (
			<div className="TimeSpentBackgroud">
				<MainScreen title="Add Your Time">
					<br></br>
					<br></br>
					<Button
						style={{
							padding: "8px",
							fontSize: "15px",
						}}
						variant="success"
						className="logoutBtn"
						href="/time-customer-report"
					>
						Back To Report
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "60%",
							borderWidth: 0,
							padding: 15,
							background: "#553939",
							borderRadius: 60,
							marginLeft: 300,
						}}
					>
						<Card.Body>
							<br></br>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

								<Form.Group controlId="date">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
										}}
									>
										Date
									</Form.Label>
									<br />
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="date"
										required
										value={date}
										onChange={(e) => setDate(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="weight">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
										}}
									>
										Time
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="string"
										value={time}
										placeholder="time in minute"
										onChange={(e) => setTime(e.target.value)}
										required
									/>
								</Form.Group>

								{loading && <Loading size={50} />}
								<br></br>
								<Button style={{ fontSize: 13, marginTop: 10 }} type="submit" variant="success">
									Submit
								</Button>

								<Button
									variant="info"
									onClick={demoHandler}
									style={{
										fontSize: 13,
										marginTop: 10,
										marginLeft: 20,
									}}
								>
									Demo
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
