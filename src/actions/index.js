import axios from 'axios';
import axiosAuth from '../utils/axiosAuth';
import {reset} from 'redux-form';
import history from '../utils/history';
import { FETCH_USER, FETCH_ERROR, CREATE_ROUTE, SEARCH_ROUTE, INFO_SEARCH } from'./types';

export const setApplicationRoute = (searchData) => dispatch => {
	dispatch({type:INFO_SEARCH, payload: searchData});
}

export const searchRoutes = (routeData) => async dispatch => {
	try{
		const res = await axios.post('/api/searchRoutes', routeData);
		dispatch({type:SEARCH_ROUTE, payload: res.data})
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
	
}

export const updateUser = (userData, photo) => async dispatch => {

	try{
		// const uploadConfig = await axios.get('/api/user/photoUpload');
		// const upload = await axios.put(uploadConfig.data.url, photo, {
		// 	headers: {
		// 		'Content-Type': 'image/jpg'
		// 	}
		// })
		const res = await axios.post('/api/user/update', userData);
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
	console.log(routeId);
	try{
		const res = await axios.post('/api/getRouteForApplication', routeId);
		dispatch({type: CREATE_ROUTE, payload: res.data});
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const saveRoute = (routeData) => async dispatch => {
	try{
		const res = await axios.post('/api/saveRoute', routeData);
		dispatch({type: CREATE_ROUTE, payload: res.data});
	}catch(error){
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const fetchUser = () => async dispatch => {
	try{
		const res = await axios.get('/api/user');
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
};

export const findUserByEmail = (newPassValues) => async dispatch => {
	try{
		const res = await axios.post('/api/findUserByEmail', newPassValues);
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const checkPasscode = (newPassValues) => async dispatch => {
	try{
		const res = await axios.post('/api/checkPasscode', newPassValues);
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
	}
}

export const changePassword = (newPassValues) => async dispatch => {
	try{
		const res = await axios.post('/api/changePassword', newPassValues);
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
	try{
		const res = await axios.post('/api/user/login', loginValues);
		localStorage.setItem('user', res.data);
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		console.log(error.response);
	}
};

export const signupUser = (signupValues) => async dispatch => {
	try{
		const res = await axios.post('/api/user/signup', signupValues);
		localStorage.setItem('user', res.data);
		dispatch({type: FETCH_USER, payload: res.data});
	}catch(error) {
		dispatch({type: FETCH_ERROR, payload: error.response});
		console.log(error.response);
	}
	
};