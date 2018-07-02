import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import * as actions from '../../actions';
import isUserLogged from '../../utils/isUserLogged';
import formStyles from '../../styles/formStyles';
import RoutesForm from './Routes/RoutesForm';
import RoutesMap from './Routes/RoutesMap';

class Routes extends Component {
	constructor() {
		super()
		
		this.nextPage = this.nextPage.bind(this);
		this.previousPage = this.previousPage.bind(this);

		this.state = {
			page: 1,
			back: false
		}
	}

	async componentWillMount() {
		if (!await isUserLogged()) {
			history.push('/', { some: 'state' });
		}else{
			this.props.login();
		}
	}

	nextPage(){
		this.setState({
			page: 2,
			back: false
		})
	}

	previousPage(){
		this.setState({
			page: 1,
			back: true
		})
	}

	render() {
		const { page } = this.state;
		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Ponudi prevoz</h1>
		        {page === 1 && <RoutesForm onSubmit={this.nextPage } />}
		        {page === 2 && <RoutesMap goto={this.previousPage } /> }
			</div>
			
		);
	}
	
}

function mapStateToProps(state){
	return {routeInfo: state.routeInfo, error: state.error };
}

export default connect(mapStateToProps, actions)(Routes);