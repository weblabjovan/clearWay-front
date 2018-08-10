import React, { Component } from 'react';
import TrendingFlat from 'material-ui/svg-icons/action/trending-flat';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import statusSwitcher from '../../../utils/statusSwitcher';
import avatar from '../../../avatar.png';

class RideItem extends Component {

	render() {
		let acceptButton = <div></div>;
		if (this.props.status !== 'accepted') {
			acceptButton = <FloatingActionButton
							    backgroundColor="#43c978"
							    className="success"
							    style={{marginRight: '40px'}}
							    onClick={this.props.accept}
							>
								<Done style={{color: '#fff', height:'40px', width:'40px'}} />
							</FloatingActionButton>
		};
		let action = <div></div>;
		if (this.props.change) {
			action = <div className="action">
				{acceptButton}

				<FloatingActionButton
					backgroundColor="#F44336"
					className="fail"
					style={{marginLeft: '40px'}}
					onClick={this.props.decline}
				>
					<Clear style={{color: '#fff', height:'40px', width:'40px'}} />
				</FloatingActionButton>
			</div>
			
		}

		return(
				<div style={{borderTop: 'solid 3px #4e6a9a'}}>
					<div className="general">
						<div className="person">
							<div className="photo-container" >
								<img src={avatar} className="photo" alt="avatar"/>
							</div>
							<div className="info">
								<h5>{this.props.user}</h5>
								<h3>{this.props.rate}</h3>
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
							<span>popust 20%</span>
						</div>
						<div className="box">
							<h5>{this.props.end}</h5>
						</div>
						<div style={{clear:'both'}}></div>
					</div>
					{action}
					
				</div>
		)
	}
}

export default RideItem;