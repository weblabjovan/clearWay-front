import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Mood from 'material-ui/svg-icons/social/mood';

class NotificationItem extends Component {

	render() {
		let action = <div></div>;
		if (this.props.rating) {
			action = <div className="actions">
						<FlatButton 
							label={this.props.buttonText}
						    hoverColor="#ccc"
						    onClick={() => this.props.goToRating(this.props.reference, this.props.type)}
						/>
					</div>;
		}
		return(
			<div className="notificationItem">
				<div className="title">
					<div className="type">
						<Mood style={{color:'#fff', height: '30px', width: '30px'}} />
					</div>
					<div className="text">
						<h3>{this.props.title}</h3>
					</div>
					<div style={{clear:'both'}}></div>
				</div>
				<div className="subject">
					<div className="text">
						<h5>{this.props.date}</h5>
						<p>{this.props.text}</p>
					</div>
					{action}
				</div>
			</div>
			
		);
	}
	
}


export default NotificationItem;

