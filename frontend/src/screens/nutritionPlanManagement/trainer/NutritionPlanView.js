import { useHistory, Link } from "react-router-dom";
import { Form, Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNutritionPlanAction, listNutritionPlans } from "../../../actions/nutritionPlanAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import swal from "sweetalert";
import MainScreen from "../../../components/MainScreen";
import { useState } from "react";

export default function NutritionPlanView() {
	const dispatch = useDispatch();

	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;
	const nutritionPlanList = useSelector((state) => state.nutritionPlanList);
	const { loading, nutritionPlans, error } = nutritionPlanList;

	const nutritionPlanUpdate = useSelector((state) => state.nutritionPlanUpdate);
	const { success: successUpdate } = nutritionPlanUpdate;

	const nutritionPlanDelete = useSelector((state) => state.nutritionPlanDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = nutritionPlanDelete;

	const [search, setSearch] = useState("");
	let inputHandler = (e) => {
		var lowerCase = e.target.value.toLowerCase();
		setSearch(lowerCase);
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
					dispatch(deleteNutritionPlanAction(id));
					swal({
						title: "Success!",
						text: "Deleted Nutrition Plan Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/nutrition-plan-trainer-view");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Nutrition Plan",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(listNutritionPlans());
	}, [dispatch, history, trainerInfo, successUpdate, successDelete]);
	if (trainerInfo) {
		return (
			<div style={{ minHeight: 900, background: "rgb(48, 58, 54)" }}>
				<br></br>
				<br></br>
				<MainScreen title="Nutrition Plan List">
					<div>
						<Row>
							<Col>
								<div className="search" style={{ marginTop: 5, marginLeft: 160 }}>
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
												fontSize: 15,
												marginLeft: 580,
											}}
										/>
									</Form>
								</div>
							</Col>
						</Row>
					</div>
					<br></br>
					<br></br>
					<div>
						<Row>
							<Col>
								<Link to="/trainer">
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
								<Link to="/nutrition-plan-create-trainer">
									<Button variant="success" style={{ marginLeft: 260, marginBottom: 6, fontSize: 15 }} size="lg">
										+ Create New Plan
									</Button>
								</Link>
							</Col>
						</Row>
					</div>
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{nutritionPlans
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
													fontStyle: "bold",
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
										<div>
											<Button
												style={{
													width: "70px",
													color: "white",
													fontSize: 15,
												}}
												href={`/nutrition-plan/${nutritionPlan._id}`}
											>
												Edit
											</Button>
										</div>
										&emsp;
										<div>
											<Button
												style={{ width: "90px", fontSize: 15 }}
												variant="danger"
												className="mx-2"
												onClick={() => deleteHandler(nutritionPlan._id)}
											>
												Delete
											</Button>
										</div>
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
			</div>
		);
	}
}
