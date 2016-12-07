import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { Form, Dropdown, Button, Grid, Card, Message } from 'semantic-ui-react';
// import _ from 'lodash';

// import ItemCard from '../components/ItemCard';

// import * as actions from '../actions/dutyCalculatorActions';
// import '../styles/dutycal.scss';

const mapStateToProps = (state) => {
	return {

	}
};

const mapDispatchToProps = (dispatch) => ({
	// actions: bindActionCreators(actions, dispatch)
});

export class SampleContainer extends React.Component {
	constructor(props) {
		super(props);

		// this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
	}

	render() {
		return (
			<div>
				SampleContainer Placeholder
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SampleContainer);