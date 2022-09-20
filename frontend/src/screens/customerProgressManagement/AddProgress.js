import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProgressAction } from "../../actions/progressAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";

export default function AddProgress({ history }) {
	const [date, setDate] = useState("");
	const [weight, setWeight] = useState("");

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const progressCreate = useSelector((state) => state.progressCreate);
	const { loading, error } = progressCreate;

	const resetHandler = () => {
		setDate("");
		setWeight("");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setWeight("80");
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProgressAction(date, weight));
		resetHandler();
	};

	useEffect(() => {}, []);
	if (customerInfo) {
		return (
			<div className="progressCreate">
				<MainScreen title="Add Your Progress">
					<br></br>
					<br></br>
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/progress-customer-report"
					>
						{" "}
						Back To Progress
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "60%",
							marginLeft: 300,
							borderWidth: 0,
							padding: 25,
							outline: "none",
							background: "rgba(231, 238, 238, 0.8)",
							borderRadius: 45,
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
										}}
									>
										Current Weight
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="number"
										value={weight}
										placeholder="00"
										onChange={(e) => setWeight(e.target.value)}
										required
									/>
								</Form.Group>

								{loading && <Loading size={50} />}
								<br></br>
								<Button style={{ fontSize: 20, marginTop: 10 }} type="submit" variant="primary">
									Submit
								</Button>
								<Button
									style={{ fontSize: 20, marginTop: 10 }}
									className="mx-2"
									onClick={resetHandler}
									variant="danger"
								>
									Reset
								</Button>
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
