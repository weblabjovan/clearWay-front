import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutesItem from './RoutesItem';
import DeleteModal from '../../Regulars/DeleteModal';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../../../actions';
import isObjectEmpty from '../../../utils/isObjectEmpty';
import buttonStyles from '../../../styles/buttonStyles';
import formStyles from '../../../styles/formStyles';

class RoutesFront extends Component {

	constructor() {
		super();

		this.state = {
			modal: false,
			route: null
		}
	}

	openModal(routeId) {
		this.setState({
			modal: true,
			route: routeId
		})
	}

	closeModal() {
		this.setState({
			modal: false
		})
	}

	deleteRoute() {
		const route = {routeId: this.state.route};
		this.props.deleteRoute(route);
		this.closeModal();
	}

	displayMyRoutes() {
		if (!isObjectEmpty(this.props.routeInfo) && this.props.routeInfo.length !== undefined) {
			return (
				this.props.routeInfo.map( (route, index) => {
					return (
						<RoutesItem 
							key={index} 
							start={route.start}
							end={route.end}
							time={route.time}
							price={route.price}
							frequency={route.frequency}
							date={route.date}
							openModal={() => this.openModal(route._id)}
						/>
					)
				})
			)
		}

		return (
			<h1 className="emptyHeadline">Trenutno nemate nijedan ponuđen prevoz</h1>
		)
	}

	async componentDidMount() {
		await this.props.getAllMyRouts();
	}
	render() {
		return (
			<div style={formStyles.form}>
				{this.displayMyRoutes()}
				<DeleteModal 
					open={this.state.modal}
					handleClose={() => this.closeModal()}
					handleSuccess={() => this.deleteRoute()}
					labelCancel="Nazad"
					labelSuccess="Obriši"
					message="Ukoliko obrišete ovaj prevoz on više neće biti dostupan ostalim korisnicima. Da li ste sigurni da želite da ga obrišete?"
				/>
				<FlatButton
					onClick={() => this.props.toForm()}
				  	label="PONUDI NOVI PREVOZ"
				    backgroundColor="#43c978"
				    hoverColor="#24b35d"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				   />
			</div>
		)
	}
		
}

function mapStateToProps(state){
	return {routeInfo: state.routeInfo, error: state.error };
}

export default connect(mapStateToProps, actions)(RoutesFront);