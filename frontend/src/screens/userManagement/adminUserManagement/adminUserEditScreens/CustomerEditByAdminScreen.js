import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import { customerUpdateProfileById } from "../../../../actions/customerActions";
import axios from "axios";
import MainScreen from "../../../../components/MainScreen";
import { authHeader } from "../../../../actions/adminActions";

const CustomerEditByAdminScreen = ({ match }) => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [nic, setNic] = useState("");
	const [gender, setGender] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState();
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [bmi, setBmi] = useState("");
	const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);
	const [regDate, setRegDate] = useState("");

	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const customerUpdateById = useSelector((state) => state.customerUpdateById);
	const { loading, error } = customerUpdateById;

	const calculateBmi = async (e) => {
		let bmi = Number(weight / (height / 100) ** 2).toFixed(2);
		setBmi(bmi);
	};

	const resetHandler = async (e) => {
		e.preventDefault();

		setName("");
		setDob("");
		setNic("");
		setGender("");
		setTelephone("");
		setAddress("");
		setEmail("");
		setHeight("");
		setWeight("");
		setBmi("");
		setRegDate("");
	};

	const postDetails = (pics) => {
		if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "customerProfile");
			data.append("cloud_name", "bytesquad202202");
			fetch("https://api.cloudinary.com/v1_1/bytesquad202202/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(
				customerUpdateProfileById(
					match.params.id,
					name,
					dob,
					nic,
					gender,
					telephone,
					address,
					email,
					password,
					height,
					weight,
					bmi,
					pic,
					regDate
				)
			);
		}
	};

	useEffect(() => {
		if (adminInfo != null) {
			const fetching = async () => {
				const { data } = await axios.get(`/user/admin/customer/profile/view/${match.params.id}`, {
					headers: authHeader(),
				});
				setName(data.name);
				setDob(data.dob);
				setGender(data.gender);
				setNic(data.nic);
				setTelephone(data.telephone);
				setAddress(data.address);
				setEmail(data.email);
				setHeight(data.height);
				setWeight(data.weight);
				setBmi(data.bmi);
				setPic(data.pic);
				setRegDate(data.regDate);
			};

			fetching();
		}
	}, [match.params.id, adminInfo]);

	if (adminInfo) {
		return (
			<div className="adminCustomerEditBg">
				<br></br>
				<MainScreen title="EDIT - CUSTOMER">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/admin-customers"
					>
						{" "}
						Back to customers List
					</Button>
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
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
								{loading && <Loading />}
							</div>
							<br></br>
							<Row className="customerProfileContainer">
								<Col md={6}>
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="customerName">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="name"
												value={name}
												placeholder="Enter name"
												onChange={(e) => setName(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="customerDob">
											<Form.Label>Date Of Birth</Form.Label>
											<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
										</Form.Group>
										<div className="form-group">
											<label className="customerGender">Gender</label>
											<select
												className="form-control"
												id="customerGender"
												value={gender}
												onChange={(e) => setGender(e.target.value)}
												required
											>
												<option>Select Gender</option>
												<option value={gender.Male}>Male</option>
												<option value={gender.Female}>Female</option>
											</select>
										</div>
										<Form.Group controlId="customerFormBasicNic">
											<Form.Label>NIC Number</Form.Label>
											<Form.Control
												type="text"
												value={nic}
												placeholder="Enter NIC"
												onChange={(e) => setNic(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="customerFormBasicTelephone">
											<Form.Label>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												placeholder="Enter Telephone Number"
												onChange={(e) => setTelephone(e.target.value)}
												required
												maxLength={10}
											/>
										</Form.Group>
										<Form.Group controlId="customerFormBasicAddress">
											<Form.Label>Address</Form.Label>
											<Form.Control
												type="textArea"
												value={address}
												placeholder="Enter Address"
												onChange={(e) => setAddress(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="doctorFormBasicEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control
												type="email"
												value={email}
												placeholder="Enter Email Address"
												onChange={(e) => setEmail(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												value={password}
												placeholder="Password"
												onChange={(e) => setPassword(e.target.value)}
											/>
										</Form.Group>
										<Form.Group controlId="confirmPassword">
											<Form.Label>Confirm Password</Form.Label>
											<Form.Control
												type="password"
												value={confirmpassword}
												placeholder="Confirm Password"
												onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</Form.Group>
										{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
										<Form.Group controlId="pic">
											<Form.Label>Profile Picture</Form.Label>
											<Form.File
												onChange={(e) => postDetails(e.target.files[0])}
												id="custom-file"
												type="image/png"
												label="Upload Profile Picture"
												custom
											/>
										</Form.Group>
										<Form.Group controlId="customerFormBasicHeight">
											<Form.Label>Height (cm)</Form.Label>
											<Form.Control
												type="text"
												value={height}
												placeholder="Enter Height In Centimeters"
												onChange={(e) => setHeight(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="customerFormBasicWeight">
											<Form.Label>Weight (kg)</Form.Label>
											<Form.Control
												type="text"
												value={weight}
												placeholder="Enter Weight In Kilograms"
												onChange={(e) => setWeight(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="customerFormBasicWeight">
											<Row>
												<Col>
													<Form.Label>BMI</Form.Label>
													<Form.Control
														type="text"
														value={bmi}
														placeholder="BMI"
														onChange={(e) => setBmi(e.target.value)}
														required
													/>
												</Col>
												<Col>
													<Button
														variant="success"
														onClick={calculateBmi}
														style={{
															fontSize: 12,
															marginTop: 30,
														}}
													>
														Calculate
													</Button>
												</Col>
											</Row>
										</Form.Group>
										<Form.Group controlId="customerRegDate">
											<Form.Label>Registration Date</Form.Label>
											<Form.Control type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} required />
										</Form.Group>
										<Button
											variant="primary"
											type="submit"
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Update
										</Button>
										&emsp;
										<Button
											variant="danger"
											onClick={resetHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Reset
										</Button>
									</Form>
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

export default CustomerEditByAdminScreen;
