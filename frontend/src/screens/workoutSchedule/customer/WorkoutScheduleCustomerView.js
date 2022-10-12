import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form, ButtonGroup } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import { useSelector } from "react-redux";
import { authHeader } from "../../../actions/customerActions";

function WorkoutScheduleCustomerView() {
	const [PreWorkout, setPreWorkout] = useState("");
	const [MainWorkout, setMainWorkout] = useState("");
	const [PostWorkout, setPostWorkout] = useState("");

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/customer/schedule/${customerInfo._id}`, {
				headers: authHeader(),
			});

			setPreWorkout(data.PreWorkout);
			setMainWorkout(data.MainWorkout);
			setPostWorkout(data.PostWorkout);
		};

		fetching();
	});

	if (customerInfo) {
		return (
			<div className="WorkoutBackgroundUpdate">
				<MainScreen title="My Schedule List">
					<ButtonGroup variant="success" className="mb-2" size="lg" style={{ width: "100%" }}>
						<Button variant="success" href="/customer">
							Back to Operations Page
						</Button>

						<Button variant="success" href="/time-customer-report">
							+ Add A Time record
						</Button>
					</ButtonGroup>

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
							<Form>
								<Form.Group controlId="PreWorkout">
									<Form.Label>PreWorkout</Form.Label>
									<Form.Control type="PreWorkout" value={PreWorkout} />
								</Form.Group>
								<br />
								<Form.Group controlId="MainWorkout">
									<Form.Label>MainWorkout</Form.Label>
									<Form.Control type="MainWorkout" value={MainWorkout} />
								</Form.Group>

								<Form.Group controlId="PostWorkout">
									<Form.Label>PostWorkout</Form.Label>
									<Form.Control type="PostWorkout" value={PostWorkout} />
								</Form.Group>
								<br />
							</Form>
						</Card.Body>
					</Card>
					<br />
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

export default WorkoutScheduleCustomerView;
