import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import isUserLogged from '../utils/isUserLogged';
import formStyles from '../styles/formStyles';

class Home extends Component {
	async componentDidMount() {
		console.log(await isUserLogged());
		if (await isUserLogged()) {
			this.props.login();
		}
	}

	render() {
		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">This is Home page</h1>
			</div>
		);
	}
	
}



function mapStateToProps(state){
	return {auth: state.auth };
}

export default connect(mapStateToProps, actions)(Home);