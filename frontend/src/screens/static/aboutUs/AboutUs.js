import React from "react";
import { Container, Row } from "react-bootstrap";
import "./AboutUs.css";

export const AboutUs = () => {
	return (
		<div className="abtMain">
			<Container>
				<Row>
					<center>
						<br />
						<div className="abtUs">
							<h2>About Us </h2>
							<hr />
							<p>
								A well-equipped gym managed by a well-qualified instructor with experienced trainers.Located in the
								heart of Galle Town. We have recieved positive comments from almost all our customers.it is specially
								recommended for women looking for a decent place for physical personal trainings, to maintain fitness
								and good health.
							</p>
						</div>
						<hr className="abtHr" />
						<hr className="abtHr" style={{ marginTop: "-16.4px" }} />
						<div class="row">
							<div class="col-6 col-sm-5">
								<div className="abtMission" style={{ marginLeft: "10px", marginRight: "-50px" }}>
									<h3>Our Mission </h3>
									<p>
										Fitness Factory is a gym. Don’t let that word “gym” scare you because we’re redefining that term.
										Fitness Factory, today’s gym, is a place where ambitious, motivated individuals work to reach their
										goals and is an intelligent approach to fitness. Here, you will become better at whatever it is you
										do. We welcome you to Fitness Factory.{" "}
									</p>
								</div>
							</div>
							<div class="col-2">
								<div class="abtvl" style={{ marginLeft: "75px" }}></div>
							</div>
							<div class="col-8 col-sm-5">
								<div className="abtVison" style={{ marginRight: "10px", marginLeft: "-100px" }}>
									<h3>Our Vision </h3>
									<p>
										At Fitness Factory, members who actively and regularly participate in our health and wellness
										programs will experience improvements in physical well-being as well as joy and contentment.Members
										will be leaders in creating lasting and meaningful relationships that promote total well-being and
										care for self and others.
									</p>
									<br></br>
								</div>
							</div>

							<hr className="abtHr" />

							<hr className="abtHr" style={{ marginTop: "-16.4px" }} />
							<br />
							<br />
							<div className="abtOwner">
								<hr className="abtHr" style={{ marginTop: "-16.4px" }} />
								<div class="row" style={{ marginLeft: "150px" }}>
									<div class="col-6 col-sm-3">
										<br></br>
										<br></br>

										<img
											src="https://hairstylecamp.com/wp-content/uploads/hairstyle-for-middle-aged-men.jpg"
											alt="avatar"
											height="160px"
											width="150px"
											style={{ marginLeft: "100px", borderRadius: 90 }}
										></img>
									</div>
									<br></br>

									<div class="col-6 col-sm-6">
										<br></br>
										<h3>Owner</h3>
										<p>
											As the owner of Fitness Factory, I would like to say that we have a group of talented, motivated
											and experienced Trainers at our gym. Take advantage and stop thinking about building the dream
											body you always wanted and start taking action! Register now!
										</p>
									</div>
								</div>
								<br />
							</div>
						</div>
					</center>
				</Row>
			</Container>
		</div>
	);
};
