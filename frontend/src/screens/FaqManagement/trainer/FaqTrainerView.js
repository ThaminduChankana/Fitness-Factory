import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listFaqsTrainer } from "../../../actions/faqAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import { useState } from "react";

export default function FaqTrainerView() {
	const dispatch = useDispatch();

	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;
	const faqTrainerList = useSelector((state) => state.faqTrainerList);
	const { loading, faqForTrainer, error } = faqTrainerList;

	const [search, setSearch] = useState("");
	let inputHandler = (e) => {
		var lowerCase = e.target.value.toLowerCase();
		setSearch(lowerCase);
	};
	const history = useHistory();
	useEffect(() => {
		dispatch(listFaqsTrainer());
	}, [dispatch, history, trainerInfo]);
	if (trainerInfo) {
		return (
			<div style={{ minHeight: 700 }} className="trainerFaqView">
				<br />
				<MainScreen title="FAQ List">
					<br />
					<Row>
						<Col>
							<Button
								variant="success"
								style={{
									float: "left",
									marginTop: 5,
									fontSize: 15,
								}}
								href="/trainer"
							>
								{" "}
								Back To Dashboard
							</Button>
						</Col>
						<Col>
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
											marginLeft: 900,
										}}
									/>
								</Form>
							</div>
						</Col>
					</Row>
					<br />
					<br />
					<br />
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<Table style={{ background: "white" }}>
						<>
							<thead>
								<tr
									style={{
										boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
										height: 60,
									}}
								>
									<th
										style={{
											width: 30,
											fontSize: 20,
										}}
									>
										NIC
									</th>
									<th
										style={{
											width: 30,
											fontSize: 20,
										}}
									>
										Question Type
									</th>
									<th
										style={{
											width: 30,
											fontSize: 20,
										}}
									>
										Question Description
									</th>
									<th
										style={{
											width: 30,
											fontSize: 20,
										}}
									>
										Reply
									</th>
									<th
										style={{
											width: 30,
											fontSize: 20,
										}}
									>
										Action
									</th>
								</tr>
							</thead>

							<tbody>
								{faqForTrainer
									?.reverse()
									.filter((filteredB) => filteredB.nic.includes(search))
									.map((faq) => (
										<tr
											key={faq._id}
											style={{
												boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
												height: 60,
											}}
										>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{faq.nic}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{faq.questionType}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{faq.questionDescription}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{faq.reply}
											</td>
											<td>
												<Button style={{ width: "90px", fontSize: 15 }} href={`/faq-trainer/${faq._id}`}>
													Reply
												</Button>
											</td>
										</tr>
									))}
							</tbody>
						</>
					</Table>
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
