
import React from "react";

function User({ name, email }) {
	return (
		<div className="user">
			<h2>{name}</h2>
			<p>{email}</p>
		</div>
	);
}

export default User;
