import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import SearchItem from './SearchItem';


class SearchResult extends Component {

	displayResults() {
		console.log(this.props.routeInfo);
		if (this.props.routeInfo.length > 0 && typeof this.props.routeInfo === "object") {
			return(
				this.props.routeInfo.map( (route, index) => {
					return (
						<SearchItem 
							key={index} 
							name={route.userObj.name}
							start={route.start}
							end={route.end}
							time={route.time}
							price={route.price}
							car={route.userObj.car.model + ', ' + route.userObj.car.modelNumber + ', ' + route.userObj.car.modelYear}
							button={() => this.props.setApplicationRoute(route._id)}
						/>
					)
				})
			);
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