import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import SearchItem from './SearchItem';


class SearchResult extends Component {


	displayResults() {
		if (this.props.routeInfo.length > 0 && typeof this.props.routeInfo === "object") {
			if (this.props.routeInfo[0].userObj) {
				return(
					this.props.routeInfo.map( (route, index) => {
						
						return (
							<SearchItem 
								key={index} 
								name={route.userObj.username}
								photo={route.userObj.photo ? `https://s3.us-east-2.amazonaws.com/claro-profile-bucket/${route.userObj.photo}` : ''}
								start={route.start}
								end={route.end}
								time={route.time}
								price={route.price}
								car={route.userObj.car ? (route.userObj.car.model + ', ' + route.userObj.car.modelNumber + ', ' + route.userObj.car.modelYear) : 'trenutno nepoznato'}
								button={() => this.props.setApplicationRoute(route._id)}
								rate={route.userObj.driverNo ? (route.userObj.driverSumm / route.userObj.driverNo).toFixed(1) : 1}
							/>
						)
					})
				);
			}else{
				return(<h3 className="search-headline">Popunite parametre za pretragu</h3>);
			}	
		}else{
			if (this.props.routeInfo.length === undefined) {
				return(<h3 className="search-headline">Popunite parametre za pretragu</h3>);
			}else{
				return(<h3 className="search-headline">Bez rezultata</h3>);
			}
		}
	}

	render() {
		return(
			<div>
				{this.displayResults()}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {routeInfo: state.routeInfo, error: state.error};
}

export default connect(mapStateToProps, actions)(SearchResult);