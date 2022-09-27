import React, { useEffect, useState } from "react";
import MainScreen from "../../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../../actions/notesActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import swal from "sweetalert";
import "./CreateNote.css";

function CreateNote({ history }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");

	const dispatch = useDispatch();

	const noteCreate = useSelector((state) => state.noteCreate);
	const { loading, error } = noteCreate;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const resetHandler = () => {
		setTitle("");
		setCategory("");
		setContent("");
	};

	const demoHandler = () => {
		setTitle("Pick up new instruments");
		setCategory("Replacement");
		setContent("Pickup new dumbells and bars from the seller");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!title || !content || !category) return;
		dispatch(createNoteAction(title, content, category));

		resetHandler();
		swal({
			title: "Success !!!",
			text: "Memo Creation Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/admin-notes";
		}, 2000);
	};

	useEffect(() => {}, []);
	if (adminInfo) {
		return (
			<div className="memoBg">
				<br></br>
				<MainScreen title="Create a New Memo">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/admin-notes"
					>
						{" "}
						Back to Memo List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							paddingLeft: 25,
							paddingRight: 25,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<div className="memoContainer">
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{loading && <Loading />}
							</div>

							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="title">
									<Form.Label>Title</Form.Label>
									<Form.Control
										type="title"
										value={title}
										placeholder="Enter the title"
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="content">
									<Form.Label>Content</Form.Label>
									<Form.Control
										as="textarea"
										value={content}
										placeholder="Enter the content"
										rows={4}
										onChange={(e) => setContent(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="content">
									<Form.Label>Category</Form.Label>
									<Form.Control
										type="content"
										value={category}
										placeholder="Enter the Category"
										onChange={(e) => setCategory(e.target.value)}
										required
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button
									variant="primary"
									type="submit"
									style={{
										fontSize: 15,
										marginTop: 10,
									}}
								>
									Create Note
								</Button>
								&emsp;
								<Button
									variant="danger"
									onClick={resetHandler}
									style={{
										fontSize: 15,
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
										fontSize: 15,
										marginTop: 10,
									}}
								>
									Demo
								</Button>
							</Form>
						</div>

						<Card.Footer style={{ marginBottom: 10, borderRadius: 10 }} className="text-muted">
							Creating on - {new Date().toLocaleDateString()}
						</Card.Footer>
					</Card>
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

export default CreateNote;
