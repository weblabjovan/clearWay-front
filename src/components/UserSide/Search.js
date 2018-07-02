import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchForm from './Search/SearchForm';
import SearchResult from './Search/SearchResult';
import formStyles from '../../styles/formStyles';
import * as actions from '../../actions';
import history from '../../utils/history';
import isUserLogged from '../../utils/isUserLogged';

class Search extends Component {

	async componentWillMount() {
		if (!await isUserLogged()) {
			history.push('/', { some: 'state' });
		}else{
			this.props.login();
		}
	}

	render() {
		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Pronađi prevoz</h1>
				<SearchForm />
				<SearchResult />
			</div>
		);
	}
	
}

function mapStateToProps(state){
	return {routeInfo: state.routeInfo, error: state.error };
}

export default connect(mapStateToProps, actions)(Search);
