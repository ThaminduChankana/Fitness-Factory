import React, { useEffect, useState } from "react";
import MainScreen from "../../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../../actions/notesActions";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import swal from "sweetalert";
import "./SingleNote.css";

function SingleNote({ match, history }) {
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const [category, setCategory] = useState();
	const [date, setDate] = useState("");

	const dispatch = useDispatch();

	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { loading, error } = noteUpdate;

	const noteDelete = useSelector((state) => state.noteDelete);
	const { loading: loadingDelete, error: errorDelete } = noteDelete;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const resetHandler = () => {
		setTitle("");
		setCategory("");
		setContent("");
	};

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
					dispatch(deleteNoteAction(id));
					swal({
						title: "Success!",
						text: "Deleted Note Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});

					history.push("/admin-notes");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Note",
					type: "error",
				});
			});
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/admin/notes/${match.params.id}`);

			setTitle(data.title);
			setContent(data.content);
			setCategory(data.category);
			setDate(data.updatedAt);
		};

		fetching();
	}, [match.params.id, date]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateNoteAction(match.params.id, title, content, category));
		if (!title || !content || !category) return;

		resetHandler();

		swal({
			title: "Success !!!",
			text: "Memo Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/admin-notes";
		}, 2000);
	};
	if (adminInfo) {
		return (
			<div className="memoEditBg">
				<br></br>
				<MainScreen title="Edit Your Memo">
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
							<Form onSubmit={updateHandler}>
								{loadingDelete && <Loading />}
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
								<Form.Group controlId="title">
									<Form.Label>Title</Form.Label>
									<Form.Control
										type="title"
										placeholder="Enter the title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="content">
									<Form.Label>Content</Form.Label>
									<Form.Control
										as="textarea"
										placeholder="Enter the content"
										rows={4}
										value={content}
										onChange={(e) => setContent(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="content">
									<Form.Label>Category</Form.Label>
									<Form.Control
										type="content"
										placeholder="Enter the Category"
										value={category}
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
									Update Note
								</Button>
								&emsp;
								<Button
									className="mx-2"
									variant="danger"
									style={{
										fontSize: 15,
										marginTop: 10,
									}}
									onClick={() => deleteHandler(match.params.id)}
								>
									Delete Note
								</Button>
							</Form>
						</div>
						<Card.Footer className="text-muted" style={{ marginBottom: 10, borderRadius: 10 }}>
							Updated on - {date.substring(0, 10)}
						</Card.Footer>
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

export default SingleNote;
