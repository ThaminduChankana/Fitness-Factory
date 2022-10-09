import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import MainScreen from "../../../components/MainScreen";
import { AdminConfirmLeaveListReport } from "./AdminConfirmLeaveListReport";

const TrainerLeavePrint = () => {
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	if (adminInfo) {
		return (
			<div className="AdminLeaveReportbg">
				<MainScreen title="Admin Confirm Leave List">
					<div style={{ minHeight: 700 }}>
						<Card
							style={{
								margin: 50,
								marginLeft: "0%",
								marginRight: "5%",
								width: "120%",
								padding: 40,
								borderRadius: 20,
								borderColor: "#808080",
								borderWidth: 0.8,
								background: "rgba(200, 200, 230, 0.8)",
							}}
						>
							<AdminConfirmLeaveListReport ref={componentRef} />
							<br></br>

							<br></br>
							<Button
								style={{ marginLeft: "80%", width: "15%", height: "20%", fontSize: 15 }}
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

export default TrainerLeavePrint;
