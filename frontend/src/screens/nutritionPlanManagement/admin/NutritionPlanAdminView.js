import { useHistory } from "react-router-dom";
import { Form, Card, Accordion, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listNutritionPlansAdmin } from "../../../actions/nutritionPlanAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { useState } from "react";
import { Link } from "react-router-dom";
import MainScreen from "../../../components/MainScreen";

export default function NutritionPlanAdminView() {
	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;
	const nutritionPlanAdminList = useSelector((state) => state.nutritionPlanAdminList);
	const { loading, nutritionPlansForAdmin, error } = nutritionPlanAdminList;

	const [search, setSearch] = useState("");
	let inputHandler = (e) => {
		var lowerCase = e.target.value.toLowerCase();
		setSearch(lowerCase);
	};
	const history = useHistory();
	useEffect(() => {
		dispatch(listNutritionPlansAdmin());
	}, [dispatch, history, adminInfo]);
	if (adminInfo) {
		return (
			<div style={{ minHeight: 800, background: "rgb(48, 58, 54)" }}>
				<br></br>
				<br></br>
				<MainScreen title="Nutrition Plan List">
					<br></br>
					<div className="search" style={{ marginTop: 5 }}>
						<Form inline>
							<input
								type="text"
								placeholder="Search..."
								onChange={inputHandler}
								style={{
									width: 260,
									height: 40,
									borderRadius: 50,
									padding: "10px",
									paddingLeft: "15px",
									marginLeft: 750,
									fontSize: 15,
								}}
							/>
						</Form>
					</div>
					<br></br>
					<div>
						<Col>
							<Link to="/admin">
								<Button variant="success" style={{ marginBottom: 6, float: "left", fontSize: 15 }} size="lg">
									Back to Dashboard
								</Button>
							</Link>
						</Col>
					</div>
					<br></br>
					<br></br>
					<br></br>
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{nutritionPlansForAdmin
						?.reverse()
						.filter((filteredB) => filteredB.nic.includes(search))
						.map((nutritionPlan) => (
							<Accordion
								key={nutritionPlan._id}
								style={{
									display: "flex",
								}}
							>
								<Card
									style={{
										margin: 10,
										borderRadius: 25,
										borderWidth: 1.0,
										borderColor: "rgb(0,0,0,0.5)",
										marginTop: 20,
										paddingInline: 10,
										background: "rgb(235, 235, 235)",
										width: 1000,
									}}
									key={nutritionPlan._id}
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
											<Accordion.Toggle
												style={{
													fontSize: 20,
												}}
												as={Card.Text}
												variant="link"
												eventKey="0"
											>
												NIC : &emsp;
												{nutritionPlan.nic}
												&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;
											</Accordion.Toggle>
										</span>
									</Card.Header>
									<Accordion.Collapse
										style={{
											paddingLeft: 10,
										}}
										eventKey="0"
									>
										<Card.Body>
											<Row>
												<Col md={20}>
													<h3
														style={{
															color: "#29C379",
															fontStyle: "bold",
														}}
													>
														Plan Detail
													</h3>
													<hr
														style={{
															backgroundColor: "#29C379",
															borderWidth: 5.0,
														}}
													></hr>
													<h4>Start Date : {nutritionPlan.startDate}</h4>
													<h4>End Date : {nutritionPlan.endDate}</h4>
													<br></br>
													<h3
														style={{
															color: "#29C379",
															fontStyle: "bold",
														}}
													>
														Meal Detail
													</h3>
													<hr
														style={{
															backgroundColor: "#29C379",
															borderWidth: 5.0,
														}}
													></hr>
													<h4>Breakfast : {nutritionPlan.breakfast}</h4>
													<h4>Lunch : {nutritionPlan.lunch}</h4>
													<h4>Dinner : {nutritionPlan.dinner}</h4>
													<h4>Pre Workout Snack : {nutritionPlan.preWorkoutSnack}</h4>
													<br></br>
													<h3
														style={{
															color: "#29C379",
															fontStyle: "bold",
														}}
													>
														Additional Detail
													</h3>
													<hr
														style={{
															backgroundColor: "#29C379",
															borderWidth: 5.0,
														}}
													></hr>
													<h4>Dos : {nutritionPlan.dos}</h4>
													<h4>Donts : {nutritionPlan.donts}</h4>

													<br></br>
												</Col>
											</Row>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
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
				<br></br>
			</div>
		);
	}
}
