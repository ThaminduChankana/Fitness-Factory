import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import MainScreen from "../../../components/MainScreen";
import { CustomerRegistrationChart } from "./CustomerRegistrationChart";
import { CustomerReport } from "./CustomerReport";
import "./customerReport.css";
const CustomerPrint = () => {
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	if (adminInfo) {
		return (
			<div className="customerReportBg">
				<MainScreen>
					<div style={{ minHeight: 700 }}>
						<br></br>
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
							Back to Customers List
						</Button>
						<br></br>

						<br></br>
						<Card
							style={{
								margin: 50,
								marginLeft: "10%",
								marginRight: "10%",
								width: "80%",
								padding: 40,
								borderRadius: 20,
								borderColor: "#808080",
								borderWidth: 0.5,
								background: "rgba(255, 255, 255, 0.9)",
							}}
						>
							<CustomerReport ref={componentRef} />
							<br></br>
							<div>
								<Card
									style={{
										borderRadius: 20,
										borderColor: "#808080",
										borderWidth: 0.5,
										background: "rgba(255, 255, 255, 0.9)",
									}}
								>
									<br></br>
									<h3 style={{ marginLeft: "32%" }}>Monthly Customer Registrations</h3>
									<CustomerRegistrationChart />
									<br></br>
								</Card>
							</div>

							<br></br>
							<Button
								style={{ marginLeft: "80%", width: "20%", height: "20%" }}
								onClick={handlePrint}
								variant="success"
							>
								Generate PDF
							</Button>
						</Card>
						<br />
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

export default CustomerPrint;
