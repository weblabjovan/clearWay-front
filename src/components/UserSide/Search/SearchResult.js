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
						let car = 'trenutno nepoznato';
						if (route.userObj.car) {
							car = route.userObj.car.model + ', ' + route.userObj.car.modelNumber + ', ' + route.userObj.car.modelYear;
						}
						let rate = 1;
						if (route.userObj.driverNo != 0) {
							rate = route.userObj.driverSumm / route.userObj.driverNo;
						}
						return (
							<SearchItem 
								key={index} 
								name={route.userObj.name}
								start={route.start}
								end={route.end}
								time={route.time}
								price={route.price}
								car={car}
								button={() => this.props.setApplicationRoute(route._id)}
								rate={rate.toFixed(1)}
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