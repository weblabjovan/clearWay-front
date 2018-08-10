import { combineReducers } from 'redux';
import { reducer as reduxFrom } from 'redux-form';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import routeReducer from './routeReducer';
import searchReducer from './searchReducer';
import rideReducer from './rideReducer';
import notificationReducer from './notificationReducer';
import rateReducer from './rateReducer';


export default combineReducers({
	rate: rateReducer,
	notification: notificationReducer, 
	rides: rideReducer,
	routeInfo: routeReducer,
	search: searchReducer,
	auth: userReducer,
	error: errorReducer,
	form: reduxFrom
})