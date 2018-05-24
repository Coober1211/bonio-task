import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import rootReducer from './reducers/index';

import classList from './data/classList';
import classInfo from './data/classInfo';
import studentInfo from './data/studentInfo';

const defaultState = {
	classList,
	classInfo,
	studentInfo
};

export const history = createHistory();

const store = createStore(
	rootReducer,
	defaultState,
	compose(
		applyMiddleware(routerMiddleware(history)),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

export default store;
