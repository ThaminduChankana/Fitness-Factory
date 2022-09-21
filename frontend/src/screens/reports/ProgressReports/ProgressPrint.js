import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { Card, Button, ButtonGroup } from "react-bootstrap";

import { ProgressReport } from "./ProgressReport";
const ProgressPrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	if (customerInfo) {
		return (
			<div style={{ minHeight: 700 }} className="progressPrint">
				<br></br>
				<MainScreen title="My Progress">
					<br></br>
					<br />
					<ButtonGroup variant="success" className="mb-2" size="lg" style={{ width: "90%", marginLeft: 50 }}>
						<Button variant="success" href="/nutrition-plan-customer-view">
							My Nutrition Plan
						</Button>

						<Button variant="success" href="/progress-create-customer">
							+ Add Progress
						</Button>
					</ButtonGroup>
					<Card
						style={{
							margin: 50,
							padding: 40,
							borderRadius: 20,
							borderColor: "#808080",
							borderWidth: 0.5,
							background: "rgba(255, 255, 255, 0.9)",
						}}
					>
						<ProgressReport ref={componentRef} />
						<Button
							style={{ marginLeft: 780, left: "70%", positon: "center", width: "15%", fontSize: 12 }}
							onClick={handlePrint}
						>
							Generate PDF
						</Button>
					</Card>
					<br />
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

export default ProgressPrint;
