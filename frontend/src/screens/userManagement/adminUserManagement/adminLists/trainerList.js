import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trainerDeleteProfile, trainersList } from "../../../../actions/trainerActions";
import Loading from "../../../../components/Loading";
import ErrorMessage from "./../../../../components/ErrorMessage";
import swal from "sweetalert";

const TrainerListForAdminScreen = () => {
	const dispatch = useDispatch();

	const trainerList = useSelector((state) => state.trainerList);
	const { loading, trainers, error } = trainerList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const trainerUpdate = useSelector((state) => state.trainerUpdate);
	const { success: successUpdate } = trainerUpdate;

	const trainerDelete = useSelector((state) => state.trainerDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = trainerDelete;

	const [search, setSearch] = useState("");

	const history = useHistory();

	useEffect(() => {
		dispatch(trainersList());
		if (!adminInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, history, adminInfo, trainerDelete, successDelete, successUpdate]);

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
					dispatch(trainerDeleteProfile(id));
					swal({
						title: "Success!",
						text: "Deleted Account Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Account",
					type: "error",
				});
			});
	};

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	if (adminInfo) {
		return (
			<div className="trainerList">
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
								Trainers List
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
							<Link to="/trainer-register">
								<Button
									variant="success"
									style={{ marginRight: 10, marginBottom: 6, float: "right", fontSize: 15 }}
									size="lg"
								>
									+ Create New Trainer Account
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
					{trainers &&
						trainers
							.filter(
								(filteredTrainers) =>
									filteredTrainers.name.toLowerCase().includes(search.toLowerCase()) ||
									filteredTrainers.nic.includes(search)
							)
							.reverse()
							.map((trainerList) => (
								<div key={trainerList._id}>
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
															Trainer NIC : &emsp;
															{trainerList.nic}&emsp;
														</label>{" "}
														<br></br>
														<label className="name" style={{ paddingInline: 20, fontSize: 18 }}>
															Trainer Name : &emsp;
															{trainerList.name}
														</label>
													</Accordion.Toggle>
												</span>
												<div>
													<Button
														style={{ marginTop: 20, fontSize: 15 }}
														href={`/admin-trainer-edit/${trainerList._id}`}
													>
														Edit
													</Button>
												</div>
												&emsp;
												<div>
													<Button
														style={{ marginTop: 20, fontSize: 15 }}
														variant="danger"
														className="mx-2"
														onClick={() => deleteHandler(trainerList._id)}
													>
														Delete
													</Button>
												</div>
											</Card.Header>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<Row>
														<Col md={6}>
															<h5>Name - {trainerList.name}</h5>
															<h5>Date of Birth - {trainerList.dob}</h5>
															<h5>Gender - {trainerList.gender}</h5>
															<h5>NIC - {trainerList.nic}</h5>
															<h5>Telephone - {trainerList.telephone}</h5>
															<h5>Address - {trainerList.address}</h5>
															<h5>Email - {trainerList.email}</h5>
															<h5>Qualifications - {trainerList.qualifications}</h5>
															<h5>Experience - {trainerList.yrsexp}</h5>
														</Col>
														<Col
															style={{
																display: "flex",
																alignItems: "center",
																width: "500px",
																justifyContent: "center",
															}}
														>
															<img
																tyle={{
																	width: "100%",
																	height: "100%",
																}}
																src={trainerList.pic}
																alt={trainerList.name}
																className="profilePic"
															/>
														</Col>
													</Row>
													<br></br>
													<blockquote className="blockquote mb-0">
														<Card.Footer style={{ borderRadius: 20, background: "white" }} className="text-muted">
															Registered Date - <cite title="Source Title"> {trainerList.regDate}</cite>
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

export default TrainerListForAdminScreen;
