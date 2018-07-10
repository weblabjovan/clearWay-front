/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  TextField,
  DatePicker,
  SelectField
} from 'redux-form-material-ui';
import GoogleMapsLoader from 'google-maps';
import { MenuItem, FlatButton } from 'material-ui';
import formStyles from '../../../styles/formStyles';
import buttonStyles from '../../../styles/buttonStyles';
import * as actions from '../../../actions';

let startPlace = null;
let endPlace = null;
let startObj = null;
let endObj = null;

class SearchFrom extends Component {
	constructor() {
		super();

		this.start = null;
		this.end = null;
	}

	componentDidMount() {
		var start = this.refs.Start.getRenderedComponent().refs.component.input;
		var end = this.refs.End.getRenderedComponent().refs.component.input;
		start.placeholder = "";
		end.placeholder = "";

		GoogleMapsLoader.KEY = 'AIzaSyDE_qkM7At0AphjfEhIUWcEWebtPMq8zNw';
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.load((google) => {
      this.start = new google.maps.places.Autocomplete(start, {types: ['geocode']});
      this.start.addListener('place_changed', () => {
				startPlace = this.start.getPlace().formatted_address;
				startObj =  {lat: this.start.getPlace().geometry.location.lat(), lng: this.start.getPlace().geometry.location.lng()};
			});
			this.end = new google.maps.places.Autocomplete(end, {types: ['geocode']});
      this.end.addListener('place_changed', () => {
				endPlace = this.end.getPlace().formatted_address;
				endObj =  {lat: this.end.getPlace().geometry.location.lat(), lng: this.end.getPlace().geometry.location.lng()};
			});
      //console.log('Google Maps Loaded')
    })
	}

	clearInput(input){
		if (input === 'start') {
			if (startPlace !== null) {
				startPlace = this.refs.Start.getRenderedComponent().refs.component.input.value;
			}
		}else{
			if (endPlace !== null) {
				endPlace = this.refs.End.getRenderedComponent().refs.component.input.value;
			}
		}
	}

	componentWillUnmount () {
    GoogleMapsLoader.release(() => {
      //console.log('No google maps api around')
    })
  }

	render() {
		return(
			<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.searchRoutes(this.props.searchInfo))}>

					<input type="hidden" name="startObj" />

					<Field
						ref="Start"
						withRef={true}
						component={TextField}
						name="start"
					  hintText="Polazište"
					  fullWidth= {true}
			   		floatingLabelText="Polazište"
			     	type="text"
			     	style={formStyles.field}
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabel}
			     	underlineFocusStyle={formStyles.underlineStyle}
			     	onChange={() => this.clearInput('start')}
					/>

					<input type="hidden" name="endObj" />

					<Field
						ref="End"
						withRef={true}
						component={TextField}
						name="end"
					  hintText="Odredište"
					  fullWidth= {true}
			   		floatingLabelText="Odredište"
			     	type="text"
			     	style={formStyles.field}
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
			     	onChange={() => this.clearInput('end')}
					/>

					<Field
	            name="distance"
	            component={SelectField}
	            hintText="Udaljenost od polazišta/odredišta"
	            fullWidth= {true}
	            style={formStyles.field}
	            labelStyle={formStyles.selectLabelStyle}
	            floatingLabelStyle={formStyles.selectFloatingLabelStyle}
	            floatingLabelText="Udaljenost od polazišta/odredišta"
	          >
	            <MenuItem value="50" primaryText="50 metara" key="1"/>
	            <MenuItem value="100" primaryText="100 metara" key="2"/>
	            <MenuItem value="150" primaryText="150 metara" key="3"/>
	            <MenuItem value="200" primaryText="200 metara" key="4"/>
	            <MenuItem value="250" primaryText="250 metara" key="5"/>
	            <MenuItem value="300" primaryText="300 metara" key="6"/>
	          </Field>

					<div>
	          <Field
	            name="date"
	            component={DatePicker}
	            fullWidth= {true}
	            format={null}
	            hintText="Dan"
	            textFieldStyle={formStyles.field}
	            minDate={new Date()}
	          />
	         </div>

					<FlatButton
						type="submit"
				  	label="TRAŽI"
				    backgroundColor="#43c978"
				    hoverColor="#24b35d"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				   />
					
				</form>
		)
	}
}


function getValues(state) {
	const def = {}

	if (state.form.hasOwnProperty('searchInfo')) {
		if (state.form.searchInfo.hasOwnProperty('values')) {
			if (startPlace) {
				state.form.searchInfo.values.start = startPlace;
				state.form.searchInfo.values.startObj = startObj;
			}
			if (endPlace) {
				state.form.searchInfo.values.end = endPlace;
				state.form.searchInfo.values.endObj = endObj;
			}
			return state.form.searchInfo.values;
		}
		return def;	
	}
	return def;
}

function validate(values) {
	const errors = {};

	if (!values.start) {
		errors['start'] = "Polazište je obavezno polje";
	}
	if (!values.end) {
		errors['end'] = "Odredište je obavezno polje";
	}
	if (!values.distance) {
		errors['distance'] = "Udaljenost od polazišta/odredišta je obavezno polje.";
	}
	if (!values.date) {
		errors['date'] = "Dan je obavezno polje";
	}

	return errors;
}


function mapStateToProps(state){
	
	return {searchInfo: getValues(state), error: state.error };
}

SearchFrom = connect(mapStateToProps, actions)(SearchFrom);

export default reduxForm({
	validate,
	destroyOnUnmount: false,
 	form: 'searchInfo' // a unique name for this form
})(SearchFrom);