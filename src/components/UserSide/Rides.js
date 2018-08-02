import React, { Component } from 'react';
import { connect } from 'react-redux';
import RideMulti from './Rides/RideMulti';
import RideSingle from './Rides/RideSingle';
import history from '../../utils/history';
import * as actions from '../../actions';
import isUserLogged from '../../utils/isUserLogged';
import isObjectEmpty from '../../utils/isObjectEmpty';
import '../../utils/dateUtils';
import formStyles from '../../styles/formStyles';

class Rides extends Component {

	constructor() {
		super();

		this.reservationChangeStatus = this.reservationChangeStatus.bind(this);
	}

	async componentWillMount() {
		if (!await isUserLogged()) {
			history.push('/', { some: 'state' });
		}else{
			this.props.login();
		}
	}

	async reservationChangeStatus(resId, status) {
		const changeData = {id: resId, status: status};
		await this.props.changeReservationStatus(changeData);
	}
	

	displayPassanger() {
		if (!isObjectEmpty(this.props.rides) && typeof this.props.rides === 'object') {
			if (this.props.rides.passanger.length > 0 && this.props.rides.passanger.length != undefined) {
				return(
					this.props.rides.passanger.map( (ride, index) => {
						const date = new Date(ride.date);
						let car = 'unknown';
						if (ride.route.userObj.car) {
							car = ride.route.userObj.car.model;
						};
						return (
							<RideSingle 
								key={index} 
								date={date.trueDate()}
								time={ride.route.time}
								routeStart={ride.route.start}
								routeEnd={ride.route.end}
								start={ride.reservations[0].start}
								end={ride.reservations[0].end}
								price={ride.route.price}
								user={ride.route.userObj.username}
								car={car}
								status={ride.reservations[0].status}
								resId={ride.reservations[0]._id}
								change={ride.reservations[0].statusChange}
								reservationChange={this.reservationChangeStatus}
							/>
						)
					})
				)
			}
		}
	}

	displayDriver() {
		if (!isObjectEmpty(this.props.rides) && typeof this.props.rides === 'object') {
			if (this.props.rides.driver.length > 0 && this.props.rides.driver.length != undefined) {
				return(
					this.props.rides.driver.map( (ride, index) => {
						console.log(ride);
						const date = new Date(ride.date);
						return(
							<RideMulti 
								key={index}
								date={date.trueDate()}
								time={ride.route.time}
								routeStart={ride.route.start}
								routeEnd={ride.route.end}
								price={ride.route.price}
								reservations={ride.reservations}
								reservationChange={this.reservationChangeStatus}
							/>
						)
					})
				)
			}
		}
	}

	async componentDidMount() {
		await this.props.getAllMyRides();
	}

	render() {
		
		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Moje vožnje</h1>
				{this.displayPassanger()}
				{this.displayDriver()}
			</div>
			
		);
	}
	
}


function mapStateToProps(state){
	return {rides: state.rides, error: state.error };
}

export default connect(mapStateToProps, actions)(Rides);