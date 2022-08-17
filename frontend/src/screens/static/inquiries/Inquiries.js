import React from "react";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import "./Inquiries.css";
import Swal from "sweetalert";
import emailjs from "emailjs-com";
import MainScreen from "../../../components/MainScreen";
import "semantic-ui-css/semantic.min.css";
import { Col, Row } from "react-bootstrap";
const Inquiries = () => {
	const SERVICE_ID = "service_ljm8m3e";
	const TEMPLATE_ID = "template_0dzd8yi";
	const USER_ID = "bgoOr9BnhBbtdIsXM";

	const handleOnSubmit = (e) => {
		e.preventDefault();
		emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
			(result) => {
				Swal({
					icon: "success",
					title: "Message Sent Successfully",
					text: "We Will Get In Touch With You Soon :)",
				});
			},
			(error) => {
				Swal({
					icon: "error",
					title: "Oops, something went wrong",
					text: error.text,
				});
			}
		);
		e.target.reset();
	};

	return (
		<div className="Inquiries">
			<br></br>
			<MainScreen title={"Contact Us."}>
				<div
					style={{
						padding: 50,
						background: "rgba(235, 235, 235, 0.8)",
						borderRadius: 30,
						marginBottom: "2%",
						marginTop: "5%",
					}}
				>
					<Row>
						<Col>
							<video
								playsInline="playsInline"
								autoPlay="autoPlay"
								muted="muted"
								loop="loop"
								style={{ width: "100%", marginTop: "10%", borderRadius: 20 }}
							>
								<source
									src="https://res.cloudinary.com/bytesquad202202/video/upload/v1660763638/videos/NO_EXCUSES_-_Best_Motivational_Video_o0ndh2.mp4"
									type="video/mp4"
								/>
							</video>
							<br></br>
							<br></br>
							<h3>
								<b>
									<br></br>
									<i>
										Fitness Factory Promises You The Best Services. If You Are Not Satisfied With Anything Or If You
										Have Anything To Clarify, Please Don't Hesitate To Ask Away. As Your Fitness Partner, We are Here To
										Grant You The Maximum Satisfaction..
									</i>
								</b>
							</h3>
						</Col>
						<Col>
							<div
								style={{
									width: "80%",
									float: "right",
									background: "rgba(255, 255, 255, 0.9)",
									borderRadius: 20,
									marginTop: "5%",
								}}
							>
								<Form
									onSubmit={handleOnSubmit}
									className="FormInquiries"
									style={{ background: "rgba(231, 238, 238, 0.8)", borderRadius: 20 }}
								>
									<Form.Field
										id="form-input-control-last-name"
										control={Input}
										label="Name"
										name="user_name"
										placeholder="Enter Your Name"
										required
										icon="user circle"
									/>

									<Form.Field
										id="form-input-control-email"
										control={Input}
										label="Email"
										type="email"
										name="user_email"
										placeholder="Enter Your Email"
										required
										icon="mail"
									/>

									<Form.Field
										id="form-input-control-phone"
										control={Input}
										label="Telephone"
										name="user_phone"
										placeholder="Enter Your Telephone Number"
										required
										maxLength={10}
										icon="phone"
									/>

									<Form.Field
										id="form-textarea-control-opinion"
										control={TextArea}
										label="Message"
										name="user_message"
										placeholder="Message…"
										required
									/>
									<Button type="submit" color="green">
										Submit
									</Button>
								</Form>
							</div>
						</Col>
					</Row>
					<br></br>
				</div>
			</MainScreen>
			<br></br>
		</div>
	);
};
export default Inquiries;
