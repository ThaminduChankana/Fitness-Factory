import React, { useEffect } from "react";
import { timeSpentListAction } from "../../../actions/timeSpentAction";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";

export const TimeSpentReport = React.forwardRef((props, ref) => {
	const dispatch = useDispatch();

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;
	const time_spent_list = useSelector((state) => state.time_spent_list);
	const { loading, timeSpent, error } = time_spent_list;

	const history = useHistory();
	useEffect(() => {
		dispatch(timeSpentListAction());
	}, [dispatch, history, customerInfo]);

	return (
		<div ref={ref} className="progressReport">
			<div style={{ minHeight: 400 }}>
				<br></br>

				<br />
				<br />
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<Table>
					<>
						<thead>
							<tr
								style={{
									boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
									height: 60,
								}}
							>
								<th
									style={{
										width: 30,
										fontSize: 20,
									}}
								>
									Date
								</th>
								<th
									style={{
										width: 50,
										fontSize: 20,
									}}
								>
									Time (in minutes)
								</th>
							</tr>
						</thead>

						<tbody>
							{timeSpent?.reverse().map((timeSpentP) => (
								<tr
									key={timeSpentP._id}
									style={{
										boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
									}}
								>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{timeSpentP.date}
									</td>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{timeSpentP.time}
									</td>
								</tr>
							))}
						</tbody>
					</>
				</Table>
				<br></br>
			</div>
		</div>
	);
});
