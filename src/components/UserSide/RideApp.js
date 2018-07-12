import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import history from '../../utils/history';
import isObjectEmpty from '../../utils/isObjectEmpty';
import '../../utils/dateUtils';
import isUserLogged from '../../utils/isUserLogged';
import formStyles from '../../styles/formStyles';
import AppItem from './Application/AppItem';


class RideApp extends Component {

	sendReservation() {
		const resData = {route: this.props.search, start: this.props.searchParams.start, end: this.props.searchParams.end, rideDate: this.props.searchParams.date}
		this.props.saveReservation(resData);
	}

	displayItem(){
		if (this.props.route.length === undefined && !isObjectEmpty(this.props.route)) {
			const d = new Date(this.props.route.rideDate);
			return(
				<AppItem 
					name={this.props.route.userObj.name}
					start={this.props.route.start}
					end={this.props.route.end}
					price={this.props.route.price}
					time={this.props.route.rideStart}
					date={d.trueDate()}
					distance={Math.round(this.props.route.startDistance)}
					duration={this.props.route.rideTime}
					discount={this.props.route.rideDiscount}
					send={() => this.sendReservation()}
				/>
			)
		}
		
	}

	async componentWillMount() {
		if (!await isUserLogged()) {
			history.push('/', { some: 'state' });
		}else{
			if (isObjectEmpty(this.props.search)) {
				history.push('/dashboard', { some: 'state' });
			}else{
				this.props.login();
				const r = {routeId: this.props.search, params: this.props.searchParams};
				await this.props.getRouteForApplication(r);
			}
		}
	}

	render() {
		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Rezervacija vožnje</h1>
				{this.displayItem()}
			</div>
		);
	}
}

function mapStateToProps(state){
	let params = null;
	if (state.form.searchInfo) {
		params = state.form.searchInfo.values;
	}
	return {search: state.search, error: state.error, route: state.routeInfo, searchParams: params };
}

export default connect(mapStateToProps, actions)(RideApp);
