import _ from 'lodash';

import {
	// DUTY_CAL_ADD_EMPTY_ITEM, 
	DUTY_CAL_ADD_EMPTY_SHIPPING_TO_COUNTRY, 
	DUTY_CAL_UPDATE_CATEGORY_OPTIONS,
	DUTY_CAL_UPDATE_SUBCAT_OPTIONS,
	DUTY_CAL_UPDATE_GROUP_OPTIONS,
	DUTY_CAL_UPDATE_SUBGROUP_OPTIONS,

	DUTY_CAL_UPDATE_IMPORT_FROM,
	DUTY_CAL_UPDATE_SHIPPING_TO,

	DUTY_CAL_UPDATE_RESULTS
} from '../actions/dutyCalculatorActions';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

const shippingToOptions = [
	{
		text: 'Singapore',
		value: 'SG'
	},
	{
		text: 'Hong Kong',
		value: 'HK'
	},
	{
		text: 'Australia',
		value: 'AU'
	},
	{
		text: 'Japan',
		value: 'JP'
	},
	{
		text: 'Russia',
		value: 'RU'
	}
];

const initialState = {
	importingFromCountry: '',
	shippingToCountries: [''],
	importingFromOptions: shippingToOptions,
	shippingToOptions,
	// items: [
	//   {productInputOption: 'description'}
	// ],
	results: [],
	categoryOptions: [],
	subcategoryOptions: [],
	groupOptions: [],
	subgroupOptions: []
};

export default function dutyCalculatorReducer(state = initialState, action) {
	switch (action.type) {
		case DUTY_CAL_UPDATE_CATEGORY_OPTIONS:
			return Object.assign({}, state, {
				categoryOptions: action.categoryOptions.map(item => {
					// let { label: text, _id: value, ...rest} = item;
					let { label: text, _id: value } = item;
					return {
						text,
						value
					};
				})
			});
		case DUTY_CAL_UPDATE_SUBCAT_OPTIONS:
			return Object.assign({}, state, {
				subcategoryOptions: action.options.map(item => {
					let { label: text, _id: value } = item;
					return {
						text,
						value
					};
				})
			});
		case DUTY_CAL_UPDATE_GROUP_OPTIONS:
			return Object.assign({}, state, {
				groupOptions: action.options.map(item => {
					let { label: text, _id: value } = item;
					return {
						text,
						value
					};
				})
			});
		case DUTY_CAL_UPDATE_SUBGROUP_OPTIONS:
			return Object.assign({}, state, {
				subgroupOptions: action.options.map(item => {
					let { label: text, _id: value } = item;
					return {
						text,
						value
					};
				})
			});
		case DUTY_CAL_UPDATE_IMPORT_FROM: 
			return Object.assign({}, state, {
				importingFromCountry: action.country,
				"shippingToOptions": _.filter(shippingToOptions, (item) => {
					if (item.value === action.country) {
						return false;
					}
					return true;
				}),
				"shippingToCountries": _.filter(state.shippingToCountries, (item) => {
					if (item === action.country) {
						return false;
					}
					return true;
				})
			});
		case DUTY_CAL_UPDATE_SHIPPING_TO:
			return Object.assign({}, state, {
				shippingToCountries: state.shippingToCountries.map((item, index) => {
					if (index == action.index) {
						return action.country;
					}
					return item;
				})
			});
		case DUTY_CAL_ADD_EMPTY_SHIPPING_TO_COUNTRY:
			return Object.assign({}, state, {
				shippingToCountries: state.shippingToCountries.concat('')
			});
		case DUTY_CAL_UPDATE_RESULTS:
			return Object.assign({}, state, {
				results: action.results
			});
		default:
			return state;
	}
}
