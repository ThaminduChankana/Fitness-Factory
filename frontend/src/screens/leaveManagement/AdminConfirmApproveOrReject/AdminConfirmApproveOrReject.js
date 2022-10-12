import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { updateAdminApproveLeaveAction } from "../../../actions/leaveActions";
import MainScreen from "../../../components/MainScreen";
import axios from "axios";
import { authHeader } from "../../../actions/adminActions";

export default function AdminConfirmApproveOrReject({ match }) {
	const [fullName, setfullName] = useState("");
	const [nic, setnic] = useState("");
	const [division, setdivision] = useState("");
	const [number_of_days, setnumber_of_days] = useState("");
	const [date_for_commencing_leave, setdate_for_commencing_leave] = useState("");
	const [date_for_resuming_duties, setdate_for_resuming_duties] = useState("");
	const [reasons_for_leave, setreasons_for_leave] = useState("");
	const [approved, setapproved] = useState("");
	const [admin_confirm_date, setadmin_confirm_date] = useState("");

	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const ConfirmLeaveUpdate = useSelector((state) => state.ConfirmLeaveUpdate);
	const { loading, error } = ConfirmLeaveUpdate;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/admin/trainer/trainer_leaves/approve/${match.params.id}`, {
				headers: authHeader(),
			});

			setfullName(data.fullName);
			setnic(data.nic);
			setdivision(data.division);
			setnumber_of_days(data.number_of_days);
			setdate_for_commencing_leave(data.date_for_commencing_leave);
			setdate_for_resuming_duties(data.date_for_resuming_duties);
			setreasons_for_leave(data.reasons_for_leave);
			setapproved(data.approved);
			setadmin_confirm_date(data.admin_confirm_date);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateAdminApproveLeaveAction(
				match.params.id,
				fullName,
				nic,
				division,
				number_of_days,
				date_for_commencing_leave,
				date_for_resuming_duties,
				reasons_for_leave,
				approved,
				admin_confirm_date
			)
		);
		if (
			!fullName ||
			!nic ||
			!division ||
			!number_of_days ||
			!date_for_commencing_leave ||
			!date_for_resuming_duties ||
			!reasons_for_leave ||
			!approved
		)
			return;
	};

	if (adminInfo) {
		return (
			<div className="leaveeditBg">
				<br></br>
				<MainScreen title="CONFIRM LEAVE DETAILS">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/admin-trainer-leaves"
					>
						{" "}
						Back to Admin Confirm Leave page List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "80%",
							borderWidth: 0,
							padding: 25,
							outline: "none",
							marginLeft: 60,
							background: "rgba(231, 238, 238, 0.8)",
							borderRadius: 45,
						}}
					>
						<div className="approvecontainer">
							<br></br>
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

								{loading && <Loading />}
							</div>
							<br></br>

							<Form onSubmit={updateHandler}>
								<Form.Group controlId="Name">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Full Name
									</Form.Label>
									<Form.Control
										type="name"
										value={fullName}
										onChange={(e) => setfullName(e.target.value)}
										required
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<Form.Group controlId="Nic">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										NIC
									</Form.Label>
									<Form.Control
										type="text"
										value={nic}
										onChange={(e) => setnic(e.target.value)}
										required
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<Form.Group controlId="division">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Division
									</Form.Label>
									<Form.Control
										type="text"
										value={division}
										onChange={(e) => setdivision(e.target.value)}
										required
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<Form.Group controlId="date">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Number of days leave apply
									</Form.Label>
									<Form.Control
										type="number"
										value={number_of_days}
										onChange={(e) => setnumber_of_days(e.target.value)}
										required
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
										maxLength={10}
									/>
								</Form.Group>
								<Form.Group controlId="date">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Date for commencing leave
									</Form.Label>
									<Form.Control
										type="date"
										value={date_for_commencing_leave}
										onChange={(e) => setdate_for_commencing_leave(e.target.value)}
										required
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<Form.Group controlId="date">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Date for resuming duties
									</Form.Label>
									<Form.Control
										type="date"
										value={date_for_resuming_duties}
										onChange={(e) => setdate_for_resuming_duties(e.target.value)}
										required
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<Form.Group controlId="reason">
									<Form.Label
										style={{
											fontSize: 25,
										}}
									>
										Reasons for leave
									</Form.Label>
									<Form.Control
										type="astextarea"
										value={reasons_for_leave}
										onChange={(e) => setreasons_for_leave(e.target.value)}
										readOnly
										style={{
											height: 45,
											fontSize: 18,
										}}
									/>
								</Form.Group>
								<Form.Group controlId="approve">
									<div className="form-group">
										<label
											style={{
												fontSize: 25,
											}}
											className="adminApprove"
										>
											Confirm Leave
										</label>
										<select
											style={{
												height: 45,
												fontSize: 18,
											}}
											className="form-control"
											value={approved}
											onChange={(e) => setapproved(e.target.value)}
											required
										>
											<option value="Select Approve or Reject">Select Approve or Reject</option>
											<option value="Approved">Approve</option>
											<option value="Rejected">Reject</option>
										</select>
									</div>
								</Form.Group>
								<Button
									variant="primary"
									type="submit"
									style={{
										fontSize: 20,
										marginTop: 10,
									}}
								>
									Update
								</Button>
								&emsp;
							</Form>

							<br></br>
						</div>
					</Card>
					<br></br>
				</MainScreen>
				<br></br>
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
