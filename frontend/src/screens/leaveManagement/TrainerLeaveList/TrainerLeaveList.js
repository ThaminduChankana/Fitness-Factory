import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTrainerLeave } from "../../../actions/leaveActions";
import { trainerLeaveDelete } from "../../../actions/leaveActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import "./trainerLeaveList.css";
import swal from "sweetalert";

const TrainerLeaveList = () => {
	const dispatch = useDispatch();

	const LeaveList = useSelector((state) => state.LeaveList);
	const { loading, trainerLeave, error } = LeaveList;

	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const leaveUpdate = useSelector((state) => state.leaveUpdate);
	const { success: successUpdate } = leaveUpdate;

	const leaveCreate = useSelector((state) => state.leaveCreate);
	const { success: successCreate } = leaveCreate;

	const leaveDelete = useSelector((state) => state.leaveDelete);
	const { success: successDelete } = leaveDelete;

	const history = useHistory();

	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(listTrainerLeave());
		if (!trainerInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, history, trainerInfo, successUpdate, successCreate, successDelete]);

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
					dispatch(trainerLeaveDelete(id));
					swal({
						title: "Success!",
						text: "Deleted Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete",
					type: "error",
				});
			});
	};

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	if (trainerInfo) {
		return (
			<div className="trainerLeaveList">
				<br></br>
				<MainScreen title={`Welcome Back ${trainerInfo && trainerInfo.name}..`}>
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
								Apply for a Trainer Leave
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
						<Row>
							<Col>
								<Link to="/trainer-create-leave">
									<Button variant="success" style={{ marginLeft: 10, float: "left", fontSize: 15 }} size="lg">
										+ Apply new leave
									</Button>
								</Link>
							</Col>
						</Row>
					</div>

					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<br></br>
					{trainerLeave &&
						trainerLeave
							.filter((filteredTrainers) => filteredTrainers.division.toLowerCase().includes(search.toLowerCase()))
							.reverse()
							.map((trainerLeaveList) => (
								<div key={trainerLeaveList._id} className="listContainer">
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
															Date for commencing leave: &emsp;
															{trainerLeaveList.date_for_commencing_leave}{" "}
														</label>{" "}
														<br></br>
														<label className="resons" style={{ paddingInline: 20, fontSize: 18 }}>
															Reasons for leave: &emsp;
															{trainerLeaveList.reasons_for_leave}
														</label>
														<br></br>
													</Accordion.Toggle>
												</span>
												<div>
													{trainerLeaveList.approved === "Pending" ? (
														<Button
															style={{
																marginLeft: 20,
																float: "left",
																fontSize: 18,
																marginTop: 20,
															}}
															href={`/trainer-leave/${trainerLeaveList._id}`}
														>
															Edit
														</Button>
													) : (
														<Button
															variant="btn btn-light"
															style={{
																color: trainerLeaveList.approved === "Rejected" ? "red" : "green",
																marginTop: 20,
																fontSize: 20,
																marginRight: 40,
															}}
														>
															{trainerLeaveList.approved}
														</Button>
													)}

													{trainerLeaveList.approved === "Pending" ? (
														<Button
															variant="danger"
															className="mx-2"
															style={{ marginLeft: 20, float: "left", fontSize: 18, marginTop: 20 }}
															onClick={() => deleteHandler(trainerLeaveList._id)}
														>
															Delete
														</Button>
													) : (
														<div style={{ color: trainerLeaveList.approved === "Rejected" ? "red" : "green" }}></div>
													)}
												</div>
											</Card.Header>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<Row>
														<Col md={6}>
															<h5>Full Name - {trainerLeaveList.fullName}</h5>
															<h5>NIC - {trainerLeaveList.nic}</h5>
															<h5>Division - {trainerLeaveList.division}</h5>
															<h5>Number of days- {trainerLeaveList.number_of_days}</h5>
															<h5>Date for commencing leave - {trainerLeaveList.date_for_commencing_leave}</h5>
															<h5>Date for resuming duties - {trainerLeaveList.date_for_resuming_duties}</h5>
															<h5>Reasons for leave - {trainerLeaveList.reasons_for_leave}</h5>
															<h5>Status- {trainerLeaveList.approved}</h5>
															<br></br>
														</Col>
														<Col
															style={{
																display: "flex",
																alignItems: "center",
																width: "500px",
																justifyContent: "center",
															}}
														></Col>
													</Row>
													<br></br>
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

export default TrainerLeaveList;
