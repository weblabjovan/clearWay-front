import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PassengerInfo from './Ratings/PassengerInfo';
import Survey from './Ratings/Survey';
import ErrorBar from '../Regulars/ErrorBar';
import history from '../../utils/history';
import isUserLogged from '../../utils/isUserLogged';
import isObjectEmpty from '../../utils/isObjectEmpty';
import formStyles from '../../styles/formStyles';
import '../../utils/dateUtils';

class Ratings extends Component {

	constructor() {
		super();

		this.writeRatingMarks = this.writeRatingMarks.bind(this);
		this.sendRatings = this.sendRatings.bind(this);
		this.err = <div></div>;

		this.state = {
			timeAspect: 0,
			moneyAspect: 0,
			commAspect: 0
		}
	}

	writeRatingMarks(aspect, value) {
		this.setState({
			[aspect]: value
		});
	}

	sendRatings() {
		let flag = true;
		Object.keys(this.state).map( ( key ) => {
			// eslint-disable-next-line 
			if (this.state[key] == 0) {
				flag = false;
			}
		});
		if (flag) {
			const saveData = {
				rating: this.props.rate.rating._id,
				marks: {
					time:this.state.timeAspect, 
					money:this.state.moneyAspect, 
					comm:this.state.commAspect
				},
				notification: this.props.notification[0]._id,
				user: this.props.rate.rating.ratedUser
			}
			this.props.saveRatings(saveData);
		}else{
			this.err = <ErrorBar 
				error="Unauthorized"
				page="Rating"
			/>
			this.props.clearError();
		}
	}

	displayPassInfo() {
		if (!isObjectEmpty(this.props.rate)) {
			const date = new Date(parseInt(this.props.rate.ride.date, 10));
			let car = 'trenutno nepoznato';
			if (this.props.rate.type === 'driver') {
				car = '';
			}
			return(
				<PassengerInfo 
					name={this.props.rate.user.username}
					car={car}
					date={date.trueDate()}
					time={this.props.rate.ride.time}
					start={this.props.rate.ride.reservation.start}
					end={this.props.rate.ride.reservation.end}
					photo={this.props.rate.user.photo ? `https://s3.us-east-2.amazonaws.com/claro-profile-bucket/${this.props.rate.user.photo}` : ''}
				/>
			)
				
		};
	}

	displaySurvey() {
		if (!isObjectEmpty(this.props.rate)) {
			let word1 = 'vožnje';
			let word2 = 'vozačem i ostalim putnicima';
			let word3 = 'plaćanjem (popustom)'
			if (this.props.rate.type === 'driver') {
				word1 = 'ponašanja putnika';
				word2 = 'putnikom';
				word3 = 'naplatom'
			}
			return(
				<Survey 
					word1={word1}
					word2={word2}
					word3={word3}
					write={this.writeRatingMarks}
					send={this.sendRatings}
				/>
			)
				
		};
	}

	async componentWillMount() {
		console.log(this.props.rate);
		if (!await isUserLogged()) {
			history.push('/', { some: 'state' });
		}else{
			this.props.login();
		}
	}

	render() {
		return(
			<div style={formStyles.containerStyle}>
				{this.displayPassInfo()}
				{this.displaySurvey()}
				{this.err}
			</div>
			
		);
	}
	
}

function mapStateToProps(state){
	return { rate: state.rate, notification: state.notification, error: state.error };
}

export default connect(mapStateToProps, actions)(Ratings);