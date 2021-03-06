import React, { Component } from 'react';
import TrendingFlat from 'material-ui/svg-icons/action/trending-flat';
import Clear from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import statusSwitcher from '../../../utils/statusSwitcher';
import avatar from '../../../avatar.png';

class RideItem extends Component {

	render() {
		let action = <div></div>;
		if (this.props.change) {
			action = <div className="action">

						<FloatingActionButton
						    backgroundColor="#F44336"
						    className="fail"
						    onClick={() => this.props.reservationChange(this.props.resId, 'canceled')}
						>
							<Clear style={{color: '#fff', height:'40px', width:'40px'}} />
						</FloatingActionButton>
					</div>
			
		}

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
				<div style={{borderTop: 'solid 3px #4e6a9a'}}>
					<div className="general">
						<div className="person">
							<div className="photo-container" >
								<img src={this.props.photo ? this.props.photo : avatar} className="photo" alt="avatar"/>
							</div>
							<div className="info">
								<h5>{this.props.user}</h5>
								<h5>{this.props.car}</h5>
								<h3>{this.props.driverRate}</h3>
							</div>
							
						</div>
						<div className={"status " + this.props.status}>
							<h3>{statusSwitcher(this.props.status)}</h3>
						</div>
					</div>

					<div className="ride">
						<div className="box">
							<h5>{this.props.start}</h5>
						</div>
						<div className="middle">
							<TrendingFlat style={{color:'#43c978', height: '42px', width: '42px', marginTop:'-5px'}} />
						</div>
						<div className="box">
							<h5>{this.props.end}</h5>
						</div>
						<div style={{clear:'both'}}></div>
					</div>
					{action}
					
				</div>
				
			</div>
		)
	}
}

export default RideItem;