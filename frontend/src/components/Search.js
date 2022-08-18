import React from "react";
import { Form } from "react-bootstrap";

const Search = ({ setSearch }) => {
	return (
		<div className="search" style={{ marginTop: 5, marginLeft: 150 }}>
			<Form inline>
				<input
					type="text"
					placeholder="Search..."
					style={{ width: 400, height: 40, borderRadius: 50, padding: "10px", paddingLeft: "15px" }}
				/>
			</Form>
		</div>
	);
};

export default Search;
