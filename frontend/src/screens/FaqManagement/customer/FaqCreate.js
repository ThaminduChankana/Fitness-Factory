import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createFaqAction } from "../../../actions/faqAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import "./faq.css";

export default function FaqCreate({ history }) {
	const [questionType, setQuestionType] = useState("");
	const [questionDescription, setQuestionDescription] = useState("");

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const faqCreate = useSelector((state) => state.faqCreate);
	const { loading, error } = faqCreate;

	const resetHandler = () => {
		setQuestionType("");
		setQuestionDescription("");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setQuestionDescription("test");
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createFaqAction(customerInfo.nic, questionType, questionDescription));
		resetHandler();
	};

	useEffect(() => {}, []);
	if (customerInfo) {
		return (
			<div className="faqCreate">
				<MainScreen title="Create Your FAQ">
					<br></br>
					<br></br>
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/faq-customer-view"
					>
						{" "}
						Back To FAQ List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "60%",
							borderWidth: 0,
							padding: 15,
							outline: "none",
							marginLeft: 300,
							background: "rgba(231, 238, 238, 0.8)",
							borderRadius: 45,
						}}
					>
						<Card.Body>
							<br></br>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="question type">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Question Type
									</Form.Label>
									<br />
									<select
										style={{
											height: "35px",
											width: "100%",
											borderRadius: 5,
											borderColor: "#808080",
											borderWidth: 0.5,
											fontSize: 20,
										}}
										onChange={(e) => setQuestionType(e.target.value)}
									>
										<option value="Select">Select</option>
										<option value="Workout Related FAQ">Workout Related FAQ</option>
										<option value="Meal Plan Related FAQ">Meal Plan Related FAQ</option>
										<option value="Other">Other</option>
									</select>
								</Form.Group>

								<Form.Group controlId="questionDescription">
									<Form.Label
										style={{
											fontSize: 20,
										}}
									>
										Question Description
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										as="textarea"
										type="questionDescription"
										value={questionDescription}
										placeholder="Enter the Question Description"
										onChange={(e) => setQuestionDescription(e.target.value)}
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
