import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateFaqAction } from "../../../actions/faqAction";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { authHeader } from "../../../actions/customerActions";
import MainScreen from "../../../components/MainScreen";
import "./faq.css";

export default function FaqUpdate({ match, history }) {
	const [questionType, setQuestionType] = useState("");
	const [questionDescription, setQuestionDescription] = useState("");

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const faqUpdate = useSelector((state) => state.faqUpdate);
	const { loading, error } = faqUpdate;

	const faqDelete = useSelector((state) => state.faqDelete);
	const { loading: loadingDelete, error: errorDelete } = faqDelete;

	const resetHandler = () => {
		setQuestionType("");
		setQuestionDescription("");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/customer/faq/get/${match.params.id}`, {
				headers: authHeader(),
			});
			setQuestionType(data.questionType);
			setQuestionDescription(data.questionDescription);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateFaqAction(match.params.id, questionType, questionDescription));
		if (!questionType || !questionDescription) return;
	};
	if (customerInfo) {
		return (
			<div className="faqUpdate">
				<MainScreen title="Update Your FAQ">
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
							<Form onSubmit={updateHandler}>
								{loadingDelete && <Loading />}
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
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
										value={questionType}
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
										as="textarea"
										type="questionDescription"
										value={questionDescription}
										placeholder="Enter the Question Description"
										onChange={(e) => setQuestionDescription(e.target.value)}
										required
										style={{
											height: 40,
											fontSize: 18,
										}}
									/>
								</Form.Group>

								{loading && <Loading size={50} />}
								<Button style={{ fontSize: 20, marginTop: 10 }} type="submit" variant="primary">
									Submit
								</Button>
								<Button
									style={{ fontSize: 20, marginTop: 10 }}
									className="mx-2"
									variant="danger"
									onClick={() => resetHandler()}
								>
									Reset
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
