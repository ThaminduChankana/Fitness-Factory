import { Button, Card } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./LoginSelector.css";

const LoginSelectorPage = () => {
	return (
		<div className="loginSelectBg">
			<br></br>
			<MainScreen title={"Log in Here ..."}>
				<br></br>
				<Card
					style={{
						borderRadius: 45,
						borderWidth: 2.0,
						marginTop: 20,
						paddingInline: 10,
						background: "rgba(231, 238, 238, 0.8)",
						marginLeft: "20%",
						marginRight: "20%",
					}}
				>
					<div className="loginSelect">
						<div className="intro-text" style={{ marginTop: 10 }}>
							<br></br>
							<br></br>
							<a href="/customer-login">
								<Button variant="success" size="lg" style={{ width: 350, height: 75 }}>
									Customer Login
								</Button>
							</a>
							<br></br>
							<br></br>
							<a href="/trainer-login">
								<Button variant="success" size="lg" style={{ width: 350, height: 75 }}>
									Trainer Login
								</Button>
							</a>
							<br></br>
							<br></br>
							<a href="/admin-login">
								<Button variant="success" size="lg" style={{ width: 350, height: 75 }}>
									Admin Login
								</Button>
							</a>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
						</div>
					</div>
				</Card>
			</MainScreen>
		</div>
	);
};

export default LoginSelectorPage;
