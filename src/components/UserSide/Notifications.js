import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NotificationItem from './Notifications/NotificationItem';
import history from '../../utils/history';
import isUserLogged from '../../utils/isUserLogged';
import isObjectEmpty from '../../utils/isObjectEmpty';
import formStyles from '../../styles/formStyles';
import '../../utils/dateUtils';

class Notifications extends Component {

	displayNotifications() {
		if (!isObjectEmpty(this.props.notification) && typeof this.props.notification === 'object') {
			if (this.props.notification.length > 0 && this.props.notification.length != undefined) {
				return(
					this.props.notification.map( (notification, index) => {
						const date = new Date(parseInt(notification.createDate));
						let title = 'Ocenjivanje vožnje';
						let text = 'Popuniti kratki upitnik za ocenjivanje vožnje (samo 3 stavke) i na taj način izrazite nivo vašeg zadovoljstva uslugom i omogućite sebi dalje besplatno korišćenje ClearWay aplikacije.';
						let buttonText = 'Ocenite vožnju';
						if (notification.referenceType === 'driver') {
							title = 'Ocenjivanje putnika';
							text = 'Popuniti kratki upitnik za ocenjivanje putnika (samo 3 stavke) i na taj način izrazite nivo vašeg zadovoljstva uslugom i omogućite sebi dalje besplatno korišćenje ClearWay aplikacije.';
							buttonText = 'Ocenite putnika';
						};

						return (
							<NotificationItem 
								key={index}
								date={date.trueDate()}
								title={title}
								text={text}
								rating={true}
								buttonText={buttonText}
								reference={notification.reference}
								type={notification.referenceType}
								goToRating={this.props.openThisRating}
							/>
						)
					})
				)
			}
		}
	}

	async componentWillMount() {
		if (!await isUserLogged()) {
			history.push('/', { some: 'state' });
		}else{
			this.props.login();
		}
	}

	async componentDidMount() {
		await this.props.getAllMyNotifications();
	}

	render() {
		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Obaveštenja</h1>
				{this.displayNotifications()}

			</div>
			
		);
	}
	
}

function mapStateToProps(state){
	return { notification: state.notification, error: state.error };
}

export default connect(mapStateToProps, actions)(Notifications);
