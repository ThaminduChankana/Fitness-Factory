import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customersListForTrainer } from "../../../actions/customerActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import "./trainerCustomerList.css";

const CustomerListForTrainerScreen = () => {
	const dispatch = useDispatch();

	const customerListForTrainer = useSelector((state) => state.customerListForTrainer);
	const { loading, customers, error } = customerListForTrainer;

	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	const history = useHistory();

	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(customersListForTrainer());
		if (!trainerInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, history, trainerInfo]);

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	if (trainerInfo) {
		return (
			<div className="trainerCustomerList">
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
								Customers List
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
								<Link to="/trainer">
									<Button variant="success" style={{ marginLeft: 10, float: "left", fontSize: 15 }} size="lg">
										Back to Dashboard
									</Button>
								</Link>
							</Col>
						</Row>
					</div>

					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<br></br>
					{customers &&
						customers
							.filter(
								(filteredCustomers) =>
									filteredCustomers.name.toLowerCase().includes(search.toLowerCase()) ||
									filteredCustomers.nic.includes(search)
							)
							.reverse()
							.map((customerList) => (
								<div key={customerList._id} className="listContainer">
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
															Customer NIC : &emsp;
															{customerList.nic}{" "}
														</label>{" "}
														<br></br>
														<label className="name" style={{ paddingInline: 20, fontSize: 18 }}>
															Customer Name : &emsp;
															{customerList.name}
														</label>
													</Accordion.Toggle>
												</span>
											</Card.Header>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<Row>
														<Col md={6}>
															<h5>Name - {customerList.name}</h5>
															<h5>Date of Birth - {customerList.dob}</h5>
															<h5>Gender - {customerList.gender}</h5>
															<h5>NIC - {customerList.nic}</h5>
															<h5>Telephone - {customerList.telephone}</h5>
															<h5>Address - {customerList.address}</h5>
															<h5>Email - {customerList.email}</h5>
															<h5>Height - {customerList.height}</h5>
															<h5>Weight - {customerList.weight}</h5>
															<h5>BMI - {customerList.bmi}</h5>
															<br></br>
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
																src={customerList.pic}
																alt={customerList.name}
																className="profilePic"
															/>
														</Col>
													</Row>
													<br></br>
													<blockquote className="blockquote mb-0">
														<Card.Footer className="text-muted" style={{ borderRadius: 20, background: "white" }}>
															Registered Date - <cite title="Source Title"> {customerList.regDate}</cite>
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

export default CustomerListForTrainerScreen;
