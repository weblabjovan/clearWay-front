import axios from 'axios';
import axiosAuth from '../utils/axiosAuth';
import {reset} from 'redux-form';
import history from '../utils/history';
import LinkKey from '../utils/linkKeys';
import loaderControllor from '../utils/loaderControllor';
import { FETCH_USER, FETCH_ERROR, CREATE_ROUTE, SEARCH_ROUTE, INFO_SEARCH, INFO_RESERVATION } from'./types';

export const saveReservation = (reservationData) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/reservation/save'), reservationData);
		dispatch({type:INFO_RESERVATION, payload: res.data});
		history.push('/dashboard', { some: 'state' });
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const setApplicationRoute = (searchData) => dispatch => {
	dispatch({type:INFO_SEARCH, payload: searchData});
}

export const searchRoutes = (routeData) => async dispatch => {
	try{
		const res = await axios.post(LinkKey('/api/route/search'), routeData);
		dispatch({type:SEARCH_ROUTE, payload: res.data})
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
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

export const getRouteForApplication = (routeId) => async dispatch => {
	try{
		const res = await axios.post(LinkKey('/api/route/getRouteForApplication'), routeId);
		dispatch({type: CREATE_ROUTE, payload: res.data});
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const saveRoute = (routeData) => async dispatch => {
	try{
		const res = await axios.post(LinkKey('/api/route/save'), routeData);
		dispatch({type: CREATE_ROUTE, payload: res.data});
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const fetchUser = () => async dispatch => {
	try{
		const link = LinkKey('/api/user');
		console.log(link);
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
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const checkPasscode = (newPassValues) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/user/checkPasscode'), newPassValues);
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const changePassword = (newPassValues) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/user/changePassword'), newPassValues);
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
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
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		console.log(error.response);
	}
};

export const signupUser = (signupValues) => async dispatch => {
	loaderControllor('on');
	try{
		const res = await axios.post(LinkKey('/api/user/signup'), signupValues);
		localStorage.setItem('user', res.data);
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		console.log(error.response);
	}
	
};