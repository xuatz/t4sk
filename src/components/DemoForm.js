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
		<Field name="title" component="input"
			type="text" placeholder="buy milk after work"
			style={{
				minWidth:'280px',
				width: '60%'
		}} />
		<button type="submit" style={{
			margin: '0px 10px'
		}}>
			Add
		</button>
	</form>
)

DemoForm = reduxForm({ form: 'demoForm' })(DemoForm)

export default DemoForm