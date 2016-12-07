import axios from 'axios';

export const DUTY_CAL_ADD_EMPTY_ITEM = 'DUTY_CAL_ADD_EMPTY_ITEM';
export const DUTY_CAL_ADD_EMPTY_SHIPPING_TO_COUNTRY = 'DUTY_CAL_ADD_EMPTY_SHIPPING_TO_COUNTRY';

export const DUTY_CAL_CALCULATE = 'DUTY_CAL_CALCULATE';
export const DUTY_CAL_UPDATE_IMPORT_FROM = 'DUTY_CAL_UPDATE_IMPORT_FROM';
export const DUTY_CAL_UPDATE_SHIPPING_TO = 'DUTY_CAL_UPDATE_SHIPPING_TO';
// export const DUTY_CAL_FETCH_CHILD_CODES = 'DUTY_CAL_FETCH_CHILD_CODES';

export const DUTY_CAL_UPDATE_CATEGORY_OPTIONS = 'DUTY_CAL_UPDATE_CATEGORY_OPTIONS';
export const DUTY_CAL_UPDATE_SUBCAT_OPTIONS = 'DUTY_CAL_UPDATE_SUBCAT_OPTIONS';
export const DUTY_CAL_UPDATE_GROUP_OPTIONS = 'DUTY_CAL_UPDATE_GROUP_OPTIONS';
export const DUTY_CAL_UPDATE_SUBGROUP_OPTIONS = 'DUTY_CAL_UPDATE_SUBGROUP_OPTIONS';
export const DUTY_CAL_UPDATE_RESULTS = 'DUTY_CAL_UPDATE_RESULTS';


// export const ;
// export const ;
// export const ;
// export const ;

export const addEmptyShippingToCountry = () => {
	return {
		type: DUTY_CAL_ADD_EMPTY_SHIPPING_TO_COUNTRY
	}
}

export const updateShippingToCountry = (country, index) => {
	return {
		type: DUTY_CAL_UPDATE_SHIPPING_TO,
		country,
		index
	}
}

export const updateImportingFromCountry = (country) => {
	return {
		type: DUTY_CAL_UPDATE_IMPORT_FROM,
		country
	}
}

export const getCategoryOptions = () => {
	return (dispatch) => {
		// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
		console.log('process.env.API_URL', process.env.API_URL);

		axios.get(process.env.API_URL + '/getHSCode')
		.then(res => {
			// console.log(res);
			// console.log(res.status);
			// console.log(res.statusText);
			dispatch({
				type: DUTY_CAL_UPDATE_CATEGORY_OPTIONS,
				categoryOptions: res.data.result
			})
		})
		.catch(err => {
			console.log(err);
			throw err;
		})
	}
}

export const calculate = (shipmentDetails) => {
	return (dispatch) => {
		console.log('shipmentDetails', shipmentDetails);
		// if (!items && items.length === 0 ) {
		// 	//todo send message to screen that items is empty!
		// 	return;
		// }

		// console.log(items)
		// console.log(importingFromCountry)
		// console.log(shippingToCountries)

		axios.get(process.env.API_URL + '/dutycal_exec', {
			params: {
				shipmentDetails
			}
		})
		.then(results => {
			// console.log(results);
			// console.log(results.status);
			// console.log(results.statusText);
			// console.log(results.data);
			dispatch({
				type: DUTY_CAL_UPDATE_RESULTS,
				results: results.data
			});
		})
		.catch(err => {
			console.log(err);
			throw err;
		})
	}
}

export const getHSCode = (targetOption, parentId) => {
	console.log('process.env.API_URL', process.env.API_URL);
	return (dispatch) => {
		// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
		// console.log('process.env.API_URL', process.env.API_URL);
		// dispatch(addEmptyShippingToCountry());
		axios.get(process.env.API_URL + '/getHSCode', {
			params: {
				id: parentId
			}
		})
		.then(res => {
			// console.log(res);
			// console.log(res.status);
			// console.log(res.statusText);
			let type;
			switch(targetOption) {
				case 'subcategoryOptions':
					type = DUTY_CAL_UPDATE_SUBCAT_OPTIONS;
					break;
				case 'groupOptions':
					type = DUTY_CAL_UPDATE_GROUP_OPTIONS;
					break;
				case 'subgroupOptions':
					type = DUTY_CAL_UPDATE_SUBGROUP_OPTIONS;
					break;
			}
			dispatch({
				type: type,
				options: res.data.result
			})
		})
	}
}