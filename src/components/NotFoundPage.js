import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
	return (
		<div>
			<div className="itc-container">
				<h4>404 Page Not Found</h4>
				<Link to="/"> Go back to homepage </Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
