import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { trainerLogout } from "../../../actions/trainerActions";
import "./ViewScreen.css";

const TrainerViewScreen = () => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [nic, setNic] = useState("");
	const [gender, setGender] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [qualifications, setQualifications] = useState("");
	const [yrsexp, setYrsexp] = useState("");
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
	const [regDate, setRegDate] = useState("");

	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;

	useEffect(() => {
		setName(trainerInfo.name);
		setDob(trainerInfo.dob);
		setNic(trainerInfo.nic);
		setGender(trainerInfo.gender);
		setTelephone(trainerInfo.telephone);
		setAddress(trainerInfo.address);
		setEmail(trainerInfo.email);
		setQualifications(trainerInfo.qualifications);
		setYrsexp(trainerInfo.yrsexp);
		setPic(trainerInfo.pic);
		setRegDate(trainerInfo.regDate);
	}, [trainerInfo]);

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(trainerLogout());
		//history.push("/");
	};

	if (trainerInfo) {
		return (
			<div className="profileViewBg">
				<br></br>
				<MainScreen title="VIEW PROFILE - TRAINER">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
							marginLeft: 10,
						}}
						href="/trainer"
					>
						{" "}
						Back to Dashboard
					</Button>
					<Button
						variant="danger"
						onClick={logoutHandler}
						style={{
							float: "right",
							marginTop: 5,
							fontSize: 15,
							marginRight: 10,
						}}
					>
						Logout
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							paddingLeft: 25,
							paddingRight: 25,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<div className="loginContainer">
							<br></br>
							<Row className="trainerProfileContainer">
								<Col md={6}>
									<Form>
										<Form.Group controlId="trainerViewName">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="name"
												value={name}
												placeholder="Enter name"
												onChange={(e) => setName(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="trainerViewDob">
											<Form.Label>Date Of Birth</Form.Label>
											<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} readOnly />
										</Form.Group>
										<Form.Group controlId="trainerViewFormBasicNic">
											<Form.Label>NIC Number</Form.Label>
											<Form.Control
												type="text"
												value={nic}
												placeholder="Enter NIC"
												onChange={(e) => setNic(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="trainerViewFormBasicGender">
											<Form.Label>Gender</Form.Label>
											<Form.Control
												type="text"
												value={gender}
												placeholder="Enter NIC"
												onChange={(e) => setGender(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="trainerViewFormBasicTelephone">
											<Form.Label>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												placeholder="Enter Telephone Number"
												onChange={(e) => setTelephone(e.target.value)}
												readOnly
												maxLength={10}
											/>
										</Form.Group>
										<Form.Group controlId="trainerViewFormBasicAddress">
											<Form.Label>Address</Form.Label>
											<Form.Control
												type="textArea"
												value={address}
												placeholder="Enter Address"
												onChange={(e) => setAddress(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="trainerViewFormBasicEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control
												type="email"
												value={email}
												placeholder="Enter Email Address"
												onChange={(e) => setEmail(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="trainerViewFormBasicQualifications">
											<Form.Label>Qualifications</Form.Label>
											<Form.Control
												type="text"
												value={qualifications}
												placeholder="Enter SLDA Register Number"
												onChange={(e) => setQualifications(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="trainerViewFormBasicYrsexp">
											<Form.Label>Experience</Form.Label>
											<Form.Control
												type="text"
												value={yrsexp}
												placeholder="Enter Licence Number"
												onChange={(e) => setYrsexp(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="trainerViewRegDate">
											<Form.Label>Registration Date</Form.Label>
											<Form.Control type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} readOnly />
										</Form.Group>
									</Form>
									<br></br>
									<Button
										variant="primary"
										href="/trainer-edit"
										style={{
											fontSize: 15,
										}}
									>
										Edit profile
									</Button>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<img
										src={pic}
										alt={name}
										className="profilePic"
										style={{
											boxShadow: "7px 7px 20px ",
											borderColor: "black",
											borderRadius: 250,
											background: "white",
											width: "300px",
											height: "300px",
										}}
									/>
								</Col>
							</Row>
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
};

export default TrainerViewScreen;
