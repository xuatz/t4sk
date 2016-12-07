import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import fuelSavings from './fuelSavingsReducer';
import dutyCalculator from './dutyCalculatorReducer';
import user from './userReducer';
// import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  dutyCalculator,
  user,
  form: formReducer
  // routing: routerReducer
});

export default rootReducer;