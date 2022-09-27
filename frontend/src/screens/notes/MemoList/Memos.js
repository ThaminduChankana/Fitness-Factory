import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Row, Col, Form, Badge } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../../actions/notesActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import swal from "sweetalert";
import "./lists.css";

const Memos = () => {
	const dispatch = useDispatch();

	const noteList = useSelector((state) => state.noteList);
	const { loading, notes, error } = noteList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const noteCreate = useSelector((state) => state.noteCreate);
	const { success: successCreate } = noteCreate;

	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { success: successUpdate } = noteUpdate; //taking out note update state from redux

	const [search, setSearch] = useState("");

	const noteDelete = useSelector((state) => state.noteDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

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
	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const history = useHistory();

	useEffect(() => {
		dispatch(listNotes());
		if (!adminInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, successCreate, history, adminInfo, successUpdate, successDelete]);
	if (adminInfo) {
		return (
			<div className="notesList">
				<br></br>
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<Row>
						<Col>
							<h1
								style={{
									display: "flex",
									marginLeft: "10px",
									width: "500px",
									color: "azure",
									fontStyle: "italic",
								}}
							>
								Memos List
							</h1>
						</Col>
						<Col>
							<div className="search" style={{ marginTop: 5, marginLeft: 150 }}>
								<Form inline>
									<input
										type="text"
										placeholder="Search..."
										style={{
											width: 400,
											height: 40,
											borderRadius: 50,
											padding: "10px",
											paddingLeft: "15px",
											fontSize: 18,
										}}
										onChange={searchHandler}
									/>
								</Form>
							</div>
						</Col>
					</Row>
					<br></br>
					<div>
						<Col>
							<Link to="/admin">
								<Button
									variant="success"
									style={{ marginLeft: 10, marginBottom: 6, float: "left", fontSize: 15 }}
									size="lg"
								>
									Back to Dashboard
								</Button>
							</Link>
						</Col>
						<Col>
							<Link to="/admin-notes/create">
								<Button
									variant="success"
									style={{ marginRight: 10, marginBottom: 6, float: "right", fontSize: 15 }}
									size="lg"
								>
									+ Create A New Memo
								</Button>
							</Link>
						</Col>
					</div>
					<br></br>
					<br></br>
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loading && <Loading />}
					{loadingDelete && <Loading />}
					<br></br>
					{notes &&
						notes
							.filter((filteredTrainers) => filteredTrainers.title.toLowerCase().includes(search.toLowerCase()))
							.reverse()
							.map((note) => (
								<div key={note._id}>
									<Accordion>
										<Card
											style={{
												margin: 10,
												borderRadius: 25,
												borderWidth: 1.0,
												borderColor: "rgb(0,0,0,0.5)",
												marginTop: 20,
												paddingInline: 10,
												background: "rgb(235, 235, 235)",
											}}
										>
											<Card.Header
												style={{
													display: "flex",
													paddingInline: 10,
													borderRadius: 25,
													marginTop: 10,
													marginBottom: 10,
													borderColor: "black",
													background: "#76BA99",
												}}
											>
												<span
													style={{
														color: "black",
														textDecoration: "none",
														flex: 1,
														cursor: "pointer",
														alignSelf: "center",
														fontSize: 18,
													}}
												>
													<Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
														<label className="nic" style={{ paddingInline: 20, marginTop: 10, fontSize: 18 }}>
															Title : &emsp;{note.title}
														</label>{" "}
													</Accordion.Toggle>
												</span>

												<div style={{ marginTop: 5 }}>
													<Button style={{ fontSize: 15 }} href={`/admin-notes-edit/${note._id}`}>
														Edit
													</Button>
													<Button
														style={{ fontSize: 15 }}
														variant="danger"
														className="mx-2"
														onClick={() => deleteHandler(note._id)}
													>
														Delete
													</Button>
												</div>
											</Card.Header>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<h4>
														<Badge variant="success">Category - {note.category}</Badge>
													</h4>
													<blockquote className="blockquote mb-0">
														<p>{note.content}</p>
														<Card.Footer style={{ marginBottom: 10, borderRadius: 10 }} className="text-muted">
															Created on -<cite title="Source Title"> {note.createdAt.substring(0, 10)}</cite>
														</Card.Footer>
													</blockquote>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									</Accordion>
								</div>
							))}
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
};

export default Memos;
