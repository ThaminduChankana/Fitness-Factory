import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import MainScreen from "../../../components/MainScreen";
import {AdminConformLeaveListReport} from "./AdminConformLeaveListReport";

const TrainerLeavePrint = () => {
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	if (adminInfo) {
		return (
			<div className="customerReportBg">
				<MainScreen title="Admin Conform Leave List">
					<div style={{ minHeight: 700 }}>
						
						<Card
							style={{
								margin: 50,
								marginLeft: "10%",
								marginRight: "10%",
								width: "100%",
								padding: 40,
								borderRadius: 20,
								borderColor: "#808080",
								borderWidth: 0.5,
								background: "rgba(255, 255, 255, 0.8)",
							}}
						>
							<AdminConformLeaveListReport ref={componentRef} />
							<br></br>

							<br></br>
							<Button
								style={{ marginLeft: "80%", width: "15%", height: "20%",fontSize:15 }}
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
