import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import classList from './classList';
import classInfo from './classInfo';
import studentInfo from './studentInfo';

const rootReducer = combineReducers({
	classList,
	classInfo,
	studentInfo,
	routing: routerReducer
});

export default rootReducer;
