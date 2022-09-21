import { Link, useHistory } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaqAction, listFaqs } from "../../../actions/faqAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import swal from "sweetalert";
import { useState } from "react";
import MainScreen from "../../../components/MainScreen";

export default function FaqView() {
	const dispatch = useDispatch();

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;
	const faqList = useSelector((state) => state.faqList);
	const { loading, faqs, error } = faqList;

	const faqUpdate = useSelector((state) => state.faqUpdate);
	const { success: successUpdate } = faqUpdate;

	const faqDelete = useSelector((state) => state.faqDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = faqDelete;

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
					dispatch(deleteFaqAction(id));
					swal({
						title: "Success!",
						text: "Deleted FAQ Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/faq-customer-view");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't FAQ",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(listFaqs());
	}, [dispatch, history, customerInfo, successUpdate, successDelete]);
	if (customerInfo) {
		return (
			<div style={{ minHeight: 700 }} className="customerFaqView">
				<br></br>
				<MainScreen title="FAQ List">
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
					<br></br>
					<br></br>
					<div>
						<Row>
							<Col>
								<Link to="/customer">
									<Button variant="success" style={{ marginBottom: 6, float: "left", fontSize: 15 }} size="lg">
										Back to Dashboard
									</Button>
								</Link>
							</Col>
							<Col>
								<Link to="/faq-create-customer">
									<Button variant="success" style={{ marginLeft: 400, marginBottom: 6, fontSize: 15 }} size="lg">
										+ Create New FAQ
									</Button>
								</Link>
							</Col>
						</Row>
					</div>

					<br />
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
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
										Question Type
									</th>
									<th
										style={{
											width: 50,
											fontSize: 20,
										}}
									>
										Question Description
									</th>
									<th
										style={{
											width: 50,
											fontSize: 20,
										}}
									>
										Reply
									</th>
									<th
										style={{
											width: 10,
											fontSize: 20,
										}}
									>
										Action
									</th>
								</tr>
							</thead>

							<tbody>
								{faqs
									?.reverse()
									.filter((filteredB) => filteredB.questionDescription.includes(search))
									.map((faq) => (
										<tr
											key={faq._id}
											style={{
												boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
											}}
										>
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
												<Button style={{ width: "70px", fontSize: 18 }} href={`/faq/${faq._id}`}>
													Edit
												</Button>

												<Button
													style={{ width: "90px", fontSize: 18 }}
													variant="danger"
													className="mx-2"
													onClick={() => deleteHandler(faq._id)}
												>
													Delete
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
