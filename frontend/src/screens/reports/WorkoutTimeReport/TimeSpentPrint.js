import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { Card, Button, ButtonGroup } from "react-bootstrap";

import { TimeSpentReport } from "./TimeSpentReport";
const TimeSpentPrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	if (customerInfo) {
		return (
			<div style={{ minHeight: 700 }} className="TimeSpentDisplayBackgroud">
				<br></br>
				<MainScreen title="My Time Spent On workout">
					<br></br>
					<br />
					<ButtonGroup variant="success" className="mb-2" size="lg" style={{ width: "90%", marginLeft: 50 }}>
						<Button variant="success" href="/workout-schedule-customer">
							My Workout Schedule
						</Button>

						<Button variant="success" href="/time-create-customer">
							+ Add a Record
						</Button>
					</ButtonGroup>
					<Card
						style={{
							margin: 50,
							padding: 40,
							borderRadius: 20,
							borderColor: "4b4e6d",
							backgroundColor: "#ddfff7",
							borderWidth: 0.5,
							opacity: 0.68,
						}}
					>
						<TimeSpentReport ref={componentRef} />
						<Button
							style={{ marginLeft: 780, left: "70%", width: "15%", fontSize: 12 }}
							onClick={handlePrint}
							variant="dark"
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

export default TimeSpentPrint;
