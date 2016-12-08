import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import fuelSavings from './fuelSavingsReducer';
import user from './userReducer';
import tasks from './tasksReducer';
// import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  user,
  tasks,
  form: formReducer
});

export default rootReducer;