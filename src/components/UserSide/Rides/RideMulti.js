import React, { Component } from 'react';
import RideItem from './RideItem';
import TrendingFlat from 'material-ui/svg-icons/action/trending-flat';

class RideMulti extends Component {

	render() {
		return(
			<div className="ridesItem">
				<div className="date">
					<h5>{this.props.date} u {this.props.time}</h5>
				</div>
				<div className="ride">
					<div className="box">
						<h5>{this.props.routeStart}</h5>
					</div>
					<div className="middle">
						<TrendingFlat style={{color:'#43c978', height: '42px', width: '42px', marginTop:'-5px'}} />
						<span>{this.props.price} rsd</span>
					</div>
					<div className="box">
						<h5>{this.props.routeEnd}</h5>
					</div>
					<div style={{clear:'both'}}></div>
				</div>

				{ 
					this.props.reservations.map( (res, index) => {
						let rate = 1;
						if (res.userObj.passengerNo != 0) {
							rate = res.userObj.passengerSumm / res.userObj.passengerNo;
						};
						return (

							<RideItem 
								key={index}
								name={res.userObj.username}
								status={res.status}
								start={res.start}
								end={res.end}
								user={res.userObj.username}
								change={res.statusChange}
								accept={() => this.props.reservationChange(res._id, 'accepted')}
								decline={() => this.props.reservationChange(res._id, 'declined')}
								rate={rate.toFixed(1)}
							/>
						)
					})
				}

			</div>
		)
	}
}

export default RideMulti;