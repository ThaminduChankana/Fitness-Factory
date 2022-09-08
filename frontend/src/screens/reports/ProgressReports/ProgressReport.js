import React, { useEffect } from "react";
import { listProgress } from "../../../actions/progressAction";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";

export const ProgressReport = React.forwardRef((props, ref) => {
	const dispatch = useDispatch();

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;
	const progressList = useSelector((state) => state.progressList);
	const { loading, progress, error } = progressList;

	const history = useHistory();
	useEffect(() => {
		dispatch(listProgress());
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
									Weight
								</th>
							</tr>
						</thead>

						<tbody>
							{progress?.reverse().map((progressC) => (
								<tr
									key={progressC._id}
									style={{
										boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
									}}
								>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{progressC.date}
									</td>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{progressC.weight}
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
