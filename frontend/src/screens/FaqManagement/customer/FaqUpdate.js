import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaqAction, updateFaqAction } from "../../../actions/faqAction";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { authHeader } from "../../../actions/customerActions";
import swal from "sweetalert";
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

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteFaqAction(id));
					swal({
						title: "Success!",
						text: "Deleted FAQ Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/faq-customer-view");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete FAQ",
					type: "error",
				});
			});
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
						href="/faq-customer-view"
					>
						Back To List
					</Button>
					<br></br>
					<br></br>
					<br></br>
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
								{loadingDelete && <Loading />}
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
								<Form.Group controlId="question type">
									<Form.Label
										style={{
											fontSize: 20,
											color: "white",
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
											color: "white",
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
								<Button style={{ fontSize: 20, marginTop: 10, borderRadius: 0 }} type="submit" variant="primary">
									Submit
								</Button>
								<Button
									style={{ fontSize: 20, marginTop: 10, borderRadius: 0 }}
									className="mx-2"
									variant="danger"
									onClick={() => deleteHandler(match.params.id)}
								>
									Delete
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
