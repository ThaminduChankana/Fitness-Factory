import { useState,useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {updateAdminApproveLeaveAction  } from "../../actions/leaveActions";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import {authHeader} from "../../actions/trainerActions"
//import './trainerUpdateLeave.css'

 export default function AdminConformApproveOrReject({match}) {

        const [fullName, setfullName] = useState("");
		const [nic, setnic] = useState("");
		const [division, setdivision] = useState("");
		const [number_of_days, setnumber_of_days] = useState("");
		const [date_for_commencing_leave, setdate_for_commencing_leave] = useState("");
		const [date_for_resuming_duties, setdate_for_resuming_duties] = useState("");
		const [reasons_for_leave, setreasons_for_leave] = useState("");
		const [approved, setapproved] = useState("");
		const [admin_conform_date,setadmin_conform_date] = useState("");


        const dispatch = useDispatch();

	    const admin_Login = useSelector((state) => state.admin_Login);
	    const { adminInfo } = admin_Login;

        const ConformLeaveUpdate = useSelector((state) => state.ConformLeaveUpdate);
		const { loading, error} = ConformLeaveUpdate;
	  
	    useEffect(() => {

            const fetching = async () => {
                const { data } = await axios.get(`/user/trainer/personal/trainer_leave/${match.params.id}`, {
                    headers: authHeader(),
                });

            console.log(data);

            
            setfullName(data.fullName);
            setnic(data.nic);
            setdivision(data.division);
            setnumber_of_days(data.number_of_days);
            setdate_for_commencing_leave(data.date_for_commencing_leave);
            setdate_for_resuming_duties(data.date_for_resuming_duties);
            setreasons_for_leave(data.reasons_for_leave);
            setapproved(data.approved)
			setadmin_conform_date(data.admin_conform_date)
                
            };
    
        fetching();
        }, [match.params.id]);
	
		
	  
    const updateHandler =  (e) => {
		e.preventDefault();
		dispatch(
			updateAdminApproveLeaveAction(
                match.params.id,
				fullName,
				nic,
				division,
				number_of_days,
				date_for_commencing_leave,
				date_for_resuming_duties,
				reasons_for_leave,
                approved,
				admin_conform_date
				
			))
		if (!fullName||!nic||!division||!number_of_days||!date_for_commencing_leave||!date_for_resuming_duties||!reasons_for_leave||!approved)return;
			
	};

	
	if (adminInfo) {
		return (
			<div className="leaveeditBg">
				<br></br>
				<MainScreen title="Conform LEAVE DETAILS">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/AdminConformLeave"
					>
						{" "}
						Back to Admin Conform Leave page List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							paddingLeft: 25,
							paddingRight: 25,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<div className="Container">
							<br></br>
							<div>
                        
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
							
								{loading && <Loading />}
							</div>
							<br></br>
							<Row className="trainerProfileContainer">
								<Col md={6}>
									<Form onSubmit={updateHandler}>
										<Form.Group controlId="trainerName">
											<Form.Label>FullName</Form.Label>
											<Form.Control
												type="name"
												value={fullName}
												onChange={(e) => setfullName(e.target.value)}
												required
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="trainerFormBasicNic">
											<Form.Label>NIC</Form.Label>
											<Form.Control
												type="text"
												value={nic}
												onChange={(e) => setnic(e.target.value)}
												required
												readOnly
											/>
										</Form.Group>

										<Form.Group controlId="trainerFormBasicNic">
											<Form.Label>Division</Form.Label>
											<Form.Control
												type="text"
												value={division}
												onChange={(e) => setdivision(e.target.value)}
												required
												readOnly
											/>
										</Form.Group>



										<Form.Group controlId="date">
											<Form.Label>Number of days leave apply</Form.Label>
											<Form.Control
												type="number"
												value={number_of_days}
												onChange={(e) => setnumber_of_days(e.target.value)}
												required
												readOnly
												maxLength={10}
											/>
										</Form.Group>
										
										<Form.Group controlId="date">
											<Form.Label>Date for commencing leave</Form.Label>
											<Form.Control
												type="date"
												value={date_for_commencing_leave}
												onChange={(e) => setdate_for_commencing_leave(e.target.value)}
												required
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="date">
											<Form.Label>Date for resuming duties</Form.Label>
											<Form.Control
												type="date"
												value={date_for_resuming_duties}
												onChange={(e) => setdate_for_resuming_duties(e.target.value)}
												required
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="reason">
											<Form.Label>Reasons for leave</Form.Label>
											<Form.Control
												type="astextarea"
												value={reasons_for_leave}
												onChange={(e) => setreasons_for_leave(e.target.value)}
												readOnly
											/>
										</Form.Group>

                                        <Form.Group controlId="approve">
										<div className="form-group">
											<label className="adminApprove">Conform Leave</label>
											<select
												className="form-control"
												value={approved}
												onChange={(e) => setapproved(e.target.value)}
												required
											>
			                                    <option>Select division</option>
                                                <option value='Approved'>Approve</option>
												<option value='Rejected'>Reject</option>
                                               
                                               
												
											</select>
										</div>
										</Form.Group>

										
										<Button
											variant="primary"
											type="submit"
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Update
										</Button>
										&emsp;
										
										
									</Form>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									
								</Col>
							</Row>
							<br></br>
						</div>
					</Card>
					<br></br>
				</MainScreen>
				<br></br>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		)
		
	}

};

 
