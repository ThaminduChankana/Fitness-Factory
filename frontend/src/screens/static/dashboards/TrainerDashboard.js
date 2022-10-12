import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { trainerLogout } from "../../../actions/trainerActions";
import "./Dashboard.css";
import MainScreen from "../../../components/MainScreen";

const TrainerDashboardPage = ({ history }) => {
	const trainer_Login = useSelector((state) => state.trainer_Login);
	const { trainerInfo } = trainer_Login;
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(trainerLogout());
		history.push("/");
	};
	if (trainerInfo) {
		return (
			<div className="trainerBackground">
				<MainScreen title={`Welcome Back ${trainerInfo && trainerInfo.name} ...`}>
					<Button
						variant="danger"
						onClick={logoutHandler}
						className="logoutBtn"
						style={{ float: "right", marginTop: 3, fontSize: 15 }}
					>
						Logout
					</Button>

					<br></br>
					<br></br>
					<br></br>
					<div className="loginContainer">
						<Card
							style={{
								borderRadius: 45,
								borderWidth: 2.0,
								marginTop: 20,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.8)",
								marginLeft: "10%",
								marginRight: "10%",
							}}
						>
							<div className="intro-text">
								<br></br>
								<br></br>
								<div>
									<a href="/trainer-view">
										<Button variant="success" size="lg" style={{ width: 350, height: 75 }}>
											My Account
										</Button>
									</a>
									&emsp;
									<a href="/trainer-customers">
										<Button variant="success" size="lg" style={{ width: 350, height: 75 }}>
											View Customers
										</Button>
									</a>
								</div>
								<br></br>
								<div>
									<a href="/workout-handling-view">
										<Button variant="success" size="lg" className="landingbutton" style={{ width: 350, height: 75 }}>
											Workout Management
										</Button>
									</a>
									<a href="/workout-schedule-view">
										<Button variant="success" size="lg" className="landingbutton" style={{ width: 350, height: 75 }}>
											Customer Schedule Management
										</Button>
									</a>
								</div>
								<br></br>
								<div>
									<a href="/faq-trainer-view">
										<Button variant="success" size="lg" className="landingbutton" style={{ width: 350, height: 75 }}>
											Q & A Management
										</Button>
									</a>
								</div>
								<br></br>
								<div>
									<a href="/nutrition-plan-trainer-view">
										<Button variant="success" size="lg" style={{ width: 350, height: 75 }}>
											Customer Meal Plan Management
										</Button>
									</a>
									&emsp;
									<a href="/trainer-leaves">
										<Button variant="success" size="lg" style={{ width: 350, height: 75 }}>
											Leave Management
										</Button>
									</a>
								</div>
								<br></br>
							</div>
							<br></br>
							<br></br>
						</Card>
					</div>
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
};

export default TrainerDashboardPage;
