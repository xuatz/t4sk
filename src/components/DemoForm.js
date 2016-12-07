import React from 'react';
import { reduxForm, Field } from 'redux-form';

const doSubmit = values => (
	//TODO STUB
	console.log('hi1')
)

const something = (props) => {
	console.log('hi2')
}

let DemoForm = props => (
	<form onSubmit={props.handleSubmit(doSubmit)}>
		<Field name="username" component="input"
			type="text" placeholder="Username" />
		<button type="submit">
			Log in
		</button>
	</form>
)

DemoForm = reduxForm({ form: 'demoForm' })(DemoForm)

export default DemoForm