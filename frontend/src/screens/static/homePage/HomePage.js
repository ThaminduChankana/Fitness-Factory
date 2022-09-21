import React from "react";
import "./bootstrap.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const HomePage = () => {
	return (
		<div>
			<header className="masthead">
				<div className="container">
					<div className="masthead-subheading">Welcome To Our Fitness Factory!</div>
					<div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
					<Link to="aboutus">
						<Button
							variant="success"
							size="lg"
							className="landingbutton"
							style={{ width: 250, height: 70, fontSize: 20, borderRadius: 0 }}
						>
							Tell Me More
						</Button>
					</Link>
				</div>
			</header>
			<section className="page-section" id="services">
				<div className="container">
					<div className="text-center">
						<h2 className="section-heading text-uppercase">Services</h2>
						<h3 className="section-subheading text-muted">Let's take a look at our services.</h3>
					</div>
					<div className="row text-center">
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fas fa-circle fa-stack-2x green-color"></i>
								<i className="fas fa-sharp fa-solid fa-dumbbell fa-stack-1x fa-inverse white-color"></i>
							</span>
							<h4 className="my-3">Workout Plan</h4>
							<p className="text-muted">
								We provide customize workout plan to maintain the health and the body weight.
							</p>
						</div>
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fas fa-circle fa-stack-2x green-color"></i>
								<i className="fas fa-sharp fa-burger fa-stack-1x fa-inverse"></i>
							</span>
							<h4 className="my-3">Nutrition Plan</h4>
							<p className="text-muted">
								Follow the customize meal plan assigned by our trainers and see the results within a short time.
							</p>
						</div>
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fas fa-circle fa-stack-2x green-color"></i>
								<i className="fas fa-comments fa-stack-1x fa-inverse"></i>
							</span>
							<h4 className="my-3">Q & A</h4>
							<p className="text-muted">
								Ask your questions related to your customized plan and get the answers from our trainers.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="page-section " id="workout">
				<div className="container">
					<div className="text-center">
						<h2 className="section-heading text-uppercase">Our Workouts</h2>
						<h3 className="section-subheading text-muted">Practice with our high quality equipments.</h3>
					</div>
					<div className="row">
						<div className="col-lg-4 col-sm-6 mb-4">
							<div className="workout-item">
								<img
									className="img-fluid"
									src="https://justhealthcaretips.com/wp-content/uploads/2019/08/burpee-1203903_1920.jpg"
									alt="..."
								/>
								<div className="workout-caption">
									<div className="workout-caption-heading">Burpees</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 mb-4">
							<div className="workout-item">
								<img
									className="img-fluid"
									src="https://global-uploads.webflow.com/5ca5fe687e34be0992df1fbe/5e43c890b4044fddd3213124_DOMYOS%20FTS%20120%20S10%20gris%20chine%CC%81%20clair%20-%20000%20---%20Expires%20on%2017-01-2024-min.jpg"
									alt="..."
								/>
								<div className="workout-caption">
									<div className="workout-caption-heading">Jumping Jack</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 mb-4">
							<div className="workout-item">
								<img
									className="img-fluid"
									src="https://www.snoridgecrossfit.com/wp-content/uploads/2014/11/Young-and-Strong_2.jpg"
									alt="..."
								/>
								<div className="workout-caption">
									<div className="workout-caption-heading">Front Squat</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
							<div className="workout-item">
								<img className="img-fluid" src="https://i.ytimg.com/vi/h618Ffw_06E/maxresdefault.jpg" alt="..." />

								<div className="workout-caption">
									<div className="workout-caption-heading">Incline Bench Press</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-sm-6">
							<div className="workout-item">
								<img
									className="img-fluid"
									src="http://prod.static9.net.au/_/media/network/images/2018/12/14/13/19/push_up_woman_th.jpg"
									alt="..."
								/>
								<div className="workout-caption">
									<div className="workout-caption-heading">Push Up</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6">
							<div className="workout-item">
								<img
									className="img-fluid"
									src="https://res.cloudinary.com/bytesquad202202/image/upload/v1663781949/images/content_dtggxo.jpg"
									alt="..."
								/>
								<div className="workout-caption">
									<div className="workout-caption-heading">Reverse Lunge</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="page-section bg-light" id="team">
				<div className="container">
					<div className="text-center">
						<center>
							<h2 className="section-heading text-uppercase">Our Wonderful Staff</h2>
							<h3 className="section-subheading text-muted">Come and see the results with your own eyes.</h3>
						</center>
					</div>
					<div className="row">
						<div className="col-lg-4">
							<div className="team-member">
								<img
									className="mx-auto rounded-circle"
									src="https://hairstylecamp.com/wp-content/uploads/hairstyle-for-middle-aged-men.jpg"
									alt="..."
								/>
								<h4>Jim Halpert</h4>
								<p className="text-muted">Fitness Factory Owner</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="team-member">
								<img
									className="mx-auto rounded-circle"
									src="https://secureservercdn.net/198.71.233.184/775.a91.myftpupload.com/wp-content/uploads/2017/09/bio_williams.jpg"
									alt="..."
								/>
								<h4>Jane Doe</h4>
								<p className="text-muted">Nutritioner</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="team-member">
								<img
									className="mx-auto rounded-circle"
									src="https://media.istockphoto.com/photos/middle-age-man-portrait-picture-id1048326026?k=6&m=1048326026&s=170667a&w=0&h=bablBD9R9lDHzidtOo07B5HKnqC8kgGWIGHMMkCHeBU="
									alt="..."
								/>
								<h4>Andy Bernard</h4>
								<p className="text-muted">Lead Trainer</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
