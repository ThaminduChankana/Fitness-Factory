import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateFaqTrainerAction } from "../../../actions/faqAction";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { authHeader } from "../../../actions/trainerActions";
import MainScreen from "../../../components/MainScreen";

export default function FaqTrainerUpdate({ match, history }) {
	const [reply, setReply] = useState("");

	const dispatch = useDispatch();
	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const faqTrainerUpdate = useSelector((state) => state.faqTrainerUpdate);
	const { loading, error } = faqTrainerUpdate;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/trainer/faq/get/${match.params.id}`, {
				headers: authHeader(),
			});
			setReply(data.reply);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateFaqTrainerAction(match.params.id, reply));
		if (!reply) return;
	};
	if (trainerInfo) {
		return (
			<div
				className="faqTrainerUpdate"
				style={{
					minHeight: 200,
				}}
			>
				<br></br>
				<br></br>
				<MainScreen title="Give Reply">
					<br></br>
					<br></br>

					<Button
						style={{
							padding: "8px",
							fontSize: "15px",
							fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
							width: "150px",
							backgroundColor: "#29C379",
							borderBlockColor: "#4D5551",
							color: "#000000",
							fontWeight: 700,
						}}
						variant="primary"
						className="logoutBtn"
						href="/faq-trainer-view"
					>
						Back To List
					</Button>

					<Card
						style={{
							width: "60%",
							borderWidth: 0,
							padding: 15,
							background: "black",
							borderRadius: 10,
							outline: "none",
							marginLeft: 300,
						}}
					>
						<Card.Body>
							<br></br>
							<Form onSubmit={updateHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="reply">
									<Form.Label
										style={{
											fontSize: 25,
											color: "white",
										}}
									>
										Reply
									</Form.Label>
									<br></br>
									<br></br>

									<Form.Control
										as="textarea"
										type="reply"
										value={reply}
										onChange={(e) => setReply(e.target.value)}
										style={{
											height: 100,
											fontSize: 18,
										}}
									/>
								</Form.Group>

								{loading && <Loading size={50} />}
								<Button style={{ fontSize: 15, marginTop: 10 }} type="submit" variant="primary">
									Submit
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
