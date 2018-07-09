import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NewPassOne from './ForgotenPassPage1';
import NewPassTwo from './ForgotenPassPage2';
import NewPassThree from './ForgotenPassPage3';
import formStyles from '../../styles/formStyles';
import history from '../../utils/history';
import loaderControllor from '../../utils/loaderControllor';

class ForgotenPassword extends Component {
	constructor() {
		super()

		this.changePage = this.changePage.bind(this);
		this.checkPage = this.checkPage.bind(this);
		this.email = "";
		this.page = 1
	}
	componentDidUpdate() {
		if (this.props.auth.change === true) {
			history.push('/login', { some: 'state' });
		}
		loaderControllor('off');
	}
	changePage() {
		if (this.props.auth.email) {
			this.email = this.props.auth.email;
			this.page = 2;
		}
		if (this.props.auth.passcode) {
			this.page = 3;
		}
	}

	checkPage() {
		this.changePage();
		return this.page;
	}
	
	render() {

		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Promeni lozinku</h1>
		        {this.checkPage() === 1 && <NewPassOne />}
		        {this.checkPage() === 2 && (<NewPassTwo email={this.email} />)}
		        {this.checkPage() === 3 && (<NewPassThree email={this.email} />)}
		    </div>
		)
	}
	
}

function mapStateToProps(state){
	return {auth: state.auth, error: state.error };
}

export default connect(mapStateToProps, actions)(ForgotenPassword);