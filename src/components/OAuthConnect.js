import React from 'react';

const HomePage = () => {
	return (
		<div>
			<div style={{width:'300px'}}>
				<button style={{width:'100%'}}>
					<a href="http://localhost:3030/auth/google">
						Connect with Google
					</a>
				</button>
			</div>

			<div style={{width:'300px'}}>
				<a href="https://asdasdasdasdasd">
					<button style={{width:'100%'}}>
						Connect with Facebook
					</button>
				</a>
			</div>
		</div>
	);
};

export default HomePage;
