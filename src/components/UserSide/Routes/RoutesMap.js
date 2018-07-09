import React, { Component } from 'react';
import { connect } from 'react-redux';
import buttonStyles from '../../../styles/buttonStyles';
import FlatButton from 'material-ui/FlatButton';
import RouteDirectionsMap from './RouteDirectionsMap';
import * as actions from '../../../actions';
import history from '../../../utils/history';

class RoutesMap extends Component {

	constructor(){
		super();

		this.clearWaypoints = this.clearWaypoints.bind(this);
	}

	async clearWaypoints() {
		console.log(this.props.routeInfo.time);
		const routeData = {routeInfo: this.props.routeInfo, waypoints: this.getWaypoints(), steps: this.getSteps()};
		await this.props.saveRoute(routeData);
		localStorage.removeItem('routeDirections');
		localStorage.removeItem('routeSteps');

		if (typeof this.props.result === 'string') {
			history.push('/dashboard', { some: 'state' });
			this.props.clearRouteForm();
		}
	}

	getWaypoints() {
		var waypoints = [];
		if (localStorage.getItem('routeDirections') !== 'undefined' && localStorage.getItem('routeDirections') !== null) {
			waypoints = JSON.parse(localStorage.getItem('routeDirections'));
		}

		return waypoints;
	}

	getSteps() {
		var steps = [];
		if (localStorage.getItem('routeSteps') !== 'undefined' && localStorage.getItem('routeSteps') !== null) {
			steps = JSON.parse(localStorage.getItem('routeSteps'));
			steps.push({start: this.props.routeInfo.endObj, end: this.props.routeInfo.endObj});
		}

		return steps;
	}

	render() {
		return(
			<div style={{textAlign: 'center'}}>
				<RouteDirectionsMap start={this.props.routeInfo.start} end={this.props.routeInfo.end} waypoints={this.getWaypoints()}/>
				<br/>
				<br/>
				<FlatButton
				  	label="BACK"
				  	backgroundColor="#4885ed"
				    hoverColor="#4377d0"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				    onClick={this.props.goto}
				 />
				<br/>
				<br/>
				<FlatButton
				  	label="SAVE"
				    backgroundColor="#43c978"
				    hoverColor="#24b35d"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				    onClick={this.clearWaypoints}
				/>
			</div>
			
		);
	}
	
}

function mapStateToProps(state){
	return {routeInfo: state.form.routeInfo.values, result: state.routeInfo};
}

export default RoutesMap = connect(mapStateToProps, actions)(RoutesMap);