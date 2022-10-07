import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTrainerLeave } from "../../../actions/leaveActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { adminConfirmLeaveActions } from "../../../actions/leaveActions";
import * as moment from "moment";

const AdminConfirmLeave = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(adminConfirmLeaveActions());
	}, [dispatch]);

	const ConfirmLeaveList = useSelector((state) => state.ConfirmLeaveList);
	const { loading, trainerLeave, error } = ConfirmLeaveList;
	const [shortedList, setShortedList] = useState([]);

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const ConfirmLeaveUpdate = useSelector((state) => state.ConfirmLeaveUpdate);
	const { success: successUpdate } = ConfirmLeaveUpdate;

	useEffect(() => {
		if (trainerLeave && trainerLeave.length > 0) {
			const sortedArr = trainerLeave.sort((a, b) => {
				return a.createdAt > b.createdAt ? 1 : -1;
			});

			setShortedList([...sortedArr]);
		}
	}, [trainerLeave]);
	const history = useHistory();

	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(listTrainerLeave());
		if (!adminInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, history, adminInfo, successUpdate]);

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	if (adminInfo) {
		return (
			<div className="trainerLeaveList">
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
								Confirm a Trainer Leave
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
					<br />
					<Row>
						<Col>
							<Link to="/admin">
								<Button variant="success" style={{ marginLeft: 20, fontSize: 15, marginTop: 10 }} size="lg">
									Back to Dashboard
								</Button>
							</Link>
						</Col>

						<Col>
							<Link to="/admin-trainer-leave-report">
								<Button variant="success" style={{ marginLeft: 190, fontSize: 15, marginTop: 10 }} size="lg">
									Trainer Leave Details confirmation Report
								</Button>
							</Link>
						</Col>
					</Row>

					<br></br>

					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<br></br>
					{shortedList &&
						shortedList
							.filter(
								(filteredTrainers) =>
									filteredTrainers.fullName.toLowerCase().includes(search.toLowerCase()) ||
									filteredTrainers.nic.includes(search)
							)
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
														<label className="name" style={{ paddingInline: 20, marginTop: 10, fontSize: 18 }}>
															Full Name : &emsp;
															{trainerLeaveList.fullName}{" "}
														</label>{" "}
														<br></br>
														<label className="nic" style={{ paddingInline: 20, fontSize: 18 }}>
															NIC: &emsp;
															{trainerLeaveList.nic}
														</label>
														<label className="Date" style={{ paddingInline: 20, fontSize: 18, color: "green" }}>
															Date: &emsp;
															{moment(trainerLeaveList.createdAt).format("DD-MMM-YYYY  LT")}
														</label>
													</Accordion.Toggle>
												</span>
												<div>
													<Button
														style={{ marginRight: 50, float: "left", fontSize: 18, marginTop: 15 }}
														href={`/admin-approve-trainer-leave/${trainerLeaveList._id}`}
													>
														Approve
													</Button>
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
															<h5>Status-{trainerLeaveList.approved}</h5>
															<h5> Approved Date-{moment(trainerLeaveList.updatedAt).format("DD-MMM-YYYY  LT")}</h5>
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

export default AdminConfirmLeave;
