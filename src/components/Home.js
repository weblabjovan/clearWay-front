import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import isUserLogged from '../utils/isUserLogged';
import axiosAuth from '../utils/axiosAuth';


class Home extends Component {
	async componentDidMount() {
		console.log(await isUserLogged());
		if (await isUserLogged()) {
			//history.push('/dashboard', { some: 'state' });
			this.props.login();
		}
	}

	render() {
		return(
			<div style={{textAlign: 'center'}}>
				<h1>This is Home page</h1>
			</div>
		);
	}
	
}



function mapStateToProps(state){
	return {auth: state.auth };
}

export default connect(mapStateToProps, actions)(Home);