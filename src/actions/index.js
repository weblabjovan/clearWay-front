import axios from 'axios';
import axiosAuth from '../utils/axiosAuth';
import {reset} from 'redux-form';
import history from '../utils/history';
import LinkKey from '../utils/linkKeys';
import loaderControllor from '../utils/loaderControllor';
import { FETCH_USER, FETCH_ERROR, CREATE_ROUTE, SEARCH_ROUTE, INFO_SEARCH, INFO_RIDE, INFO_NOTIFICATION, INFO_RATE } from'./types';

export const saveRatings = (ratingData) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/rating/save'), ratingData);
		dispatch({type:INFO_RATE, payload: res.data});
		history.push('/dashboard', { some: 'state' });
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const openThisRating = (id, type) => async dispatch =>{
	loaderControllor('on');
	const ratingData = {id, type};
	try{
		const res = await axios.post(LinkKey('/api/rating/getThis'), ratingData);
		dispatch({type:INFO_RATE, payload: res.data});
		history.push('/rating', { some: 'state' });
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const getAllMyNotifications = () => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.get(LinkKey('/api/notification/myNotifications'));
		dispatch({type:INFO_NOTIFICATION, payload: res.data});
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const changeReservationStatus = (changeData) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/ride/reservationStatusChange'), changeData);
		dispatch({type:INFO_RIDE, payload: res.data});
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const getAllMyRides = () => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.get(LinkKey('/api/ride/myRides'));
		dispatch({type:INFO_RIDE, payload: res.data});
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const saveReservation = (reservationData) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/ride/save'), reservationData);
		dispatch({type:INFO_RIDE, payload: res.data});
		history.push('/dashboard', { some: 'state' });
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const setApplicationRoute = (searchData) => dispatch => {
	dispatch({type:INFO_SEARCH, payload: searchData});
}

export const deleteRoute = (routeId) => async dispatch => {
	try{
		const res = await axios.post(LinkKey('/api/route/delete'), routeId);
		dispatch({type:CREATE_ROUTE, payload: res.data});
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const searchRoutes = (routeData) => async dispatch => {
	loaderControllor('on');
	try{
		routeData.dateString = routeData.date.toISOString();
		const res = await axios.post(LinkKey('/api/route/search'), routeData);
		dispatch({type:SEARCH_ROUTE, payload: res.data});
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
	
}

export const getAllMyRouts = () => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.get(LinkKey('/api/route/myRoutes'));
		dispatch({type:CREATE_ROUTE, payload: res.data});
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const updateUser = (userData, photo) => async dispatch => {
		// const uploadConfig = await axios.get(LinkKey('/api/user/photoUpload'));
		// const upload = await axios.put(uploadConfig.data.url, photo, {
		// 	headers: {
		// 		'Content-Type': photo.type,
		// 		'x-amz-acl': 'public-read',
  //            'x-amz-region': 'us-east-2'
		// 	}
		// });



	try{
		const res = await axios.post(LinkKey('/api/user/update'), userData);
		dispatch({type: FETCH_USER, payload: res.data});
		history.push('/dashboard', { some: 'state' });
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const clearRouteForm = () => dispatch => {
	dispatch(reset('routeInfo'));
}

export const getRouteForApplication = (routeData) => async dispatch => {
	try{
		const res = await axios.post(LinkKey('/api/route/getRouteForApplication'), routeData);
		dispatch({type: CREATE_ROUTE, payload: res.data});
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const saveRoute = (routeData) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/route/save'), routeData);
		dispatch({type: CREATE_ROUTE, payload: res.data});
		history.push('/dashboard', { some: 'state' });
		loaderControllor('off');
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const fetchUser = () => async dispatch => {
	try{
		const link = LinkKey('/api/user');
		const res = await axios.get(link);
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
};

export const findUserByEmail = (newPassValues) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/user/findByEmail'), newPassValues);
		dispatch({type: FETCH_USER, payload: res.data});
		loaderControllor('off');
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const checkPasscode = (newPassValues) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/user/checkPasscode'), newPassValues);
		dispatch({type: FETCH_USER, payload: res.data});
		loaderControllor('off');
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const changePassword = (newPassValues) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/user/changePassword'), newPassValues);
		dispatch({type: FETCH_USER, payload: res.data});
		loaderControllor('off');
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
	}
}

export const logoutUser = () => dispatch => {
	dispatch({type: FETCH_USER, payload: {}});
}

export const clearError = () => dispatch => {
	dispatch({type: FETCH_ERROR, payload: {}});
}

export const loginUser = (loginValues) => async dispatch => {
	loaderControllor('on');
	try{
		const link = LinkKey('/api/user/login');
		const res = await axios.post(link, loginValues);
		localStorage.setItem('user', res.data);
		dispatch({type: FETCH_USER, payload: res.data});
		history.push('/dashboard', { some: 'state' });
		loaderControllor('off');
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
		console.log(error.response);
	}
};

export const signupUser = (signupValues) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/user/signup'), signupValues);
		localStorage.setItem('user', res.data);
		dispatch({type: FETCH_USER, payload: res.data});
		history.push('/dashboard', { some: 'state' });
		loaderControllor('off');
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		loaderControllor('off');
		console.log(error.response);
	}
	
};