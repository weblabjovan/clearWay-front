import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';
import formStyles from '../../../styles/formStyles';

class RouteDirectionsMap extends Component {
	constructor() {
		super();

		this.map = null;
	}

	componentDidMount() {
		GoogleMapsLoader.KEY = 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg';
	    GoogleMapsLoader.LIBRARIES = ['places', 'geometry'];
	    GoogleMapsLoader.load((google) => {
	      	this.map = new google.maps.Map(document.getElementById('routeMap'), {
	          zoom: 17,
	          center: {lat: 44.8071227, lng: 20.4806883}  // Belgrade.
	        });

	        var directionsService = new google.maps.DirectionsService();
	        var directionsDisplay = new google.maps.DirectionsRenderer({
	          draggable: true,
	          map: this.map,
	          panel: document.getElementById('right-panel')
	        });

	        directionsDisplay.addListener('directions_changed', function() {
	        	var result = directionsDisplay.getDirections();
	        	var routeDirections = [];
	        	var routeSteps = [];
	        	if (localStorage.getItem('routeDirections') !== 'undefined' && localStorage.getItem('routeDirections') !== null) {
					routeDirections = JSON.parse(localStorage.getItem('routeDirections'));
				}
				
	        	for (var x = 0; x < result.routes[0].legs.length; x++) {
					result.routes[0].legs[x].via_waypoint.map( val => {
						var arr = {location: {lat: val.location.lat(), lng: val.location.lng()}};
						routeDirections.push(arr);
					});

					result.routes[0].legs[x].steps.map( val => {
						var step = {start: {lat: val.start_location.lat(), lng: val.start_location.lng()}, end: {lat: val.end_location.lat(), lng: val.end_location.lng()}};
						routeSteps.push(step);
					})
	        	}

				localStorage.setItem('routeDirections', JSON.stringify(routeDirections));
				localStorage.setItem('routeSteps', JSON.stringify(routeSteps));
	        });

	        this.displayRoute(this.props.start, this.props.end, directionsService,
	            directionsDisplay);
	      //console.log('Google Maps Loaded')
	    })
	}

	displayRoute(origin, destination, service, display) {
        service.route({
          origin: origin,
          destination: destination,
          waypoints: this.props.waypoints,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
    }

    componentWillUnmount () {
	    GoogleMapsLoader.release(() => {
	      //console.log('No google maps api around')
	    });
	}

	render() {

		return(
			<div>
				<div id="routeMap" style={formStyles.map}></div>
			</div>
		)
		
	}
}

export default RouteDirectionsMap;