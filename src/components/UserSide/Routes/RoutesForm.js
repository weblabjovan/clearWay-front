/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  TimePicker,
  DatePicker,
  SelectField,
  Slider,
  TextField,
} from 'redux-form-material-ui';
import GoogleMapsLoader from 'google-maps';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import formStyles from '../../../styles/formStyles';
import buttonStyles from '../../../styles/buttonStyles';
import * as actions from '../../../actions';


let startPlace = null;
let endPlace = null;
let endObj = null;

class RoutesForm extends Component {
 
	constructor() {
		super();

		this.start = null;
		this.end = null;
	}

	componentDidMount() {
		if (this.props.routeInfo.frequency === '2') {
			document.getElementById('singleDate').style.display = 'block';
		};
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
			});
			this.end = new google.maps.places.Autocomplete(end, {types: ['geocode']});
      this.end.addListener('place_changed', () => {
				endPlace = this.end.getPlace().formatted_address;
				endObj =  {lat: this.end.getPlace().geometry.location.lat(), lng: this.end.getPlace().geometry.location.lng()};
			});
      //console.log('Google Maps Loaded')
    })
	}

	handleFreqChange(value) {
			if (value[0] === 2) {
				document.getElementById('singleDate').style.display = 'block';
			}else{
				document.getElementById('singleDate').style.display = 'none';
			}
	}

	clearLocal(){
		if (localStorage.getItem('routeDirections') !== 'undefined' && localStorage.getItem('routeDirections') !== null) {
			localStorage.removeItem('routeDirections');
		}
	}

	clearInput(input){
		if (input === 'start') {
			if (startPlace !== null) {
				startPlace = this.refs.Start.getRenderedComponent().refs.component.input.value;
				this.clearLocal();
			}
		}else{
			if (endPlace !== null) {
				endPlace = this.refs.End.getRenderedComponent().refs.component.input.value;
				this.clearLocal();
			}
		}
	}

	componentWillUnmount () {
    GoogleMapsLoader.release(() => {
      //console.log('No google maps api around')
    })
  }

	render() {
		const { spots } = this.props.routeInfo;
		return(

			<form style={formStyles.form} onSubmit={this.props.handleSubmit}>

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
					<input type="hidden" name="timezone" />

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
						component={TextField}
						name="rate"
					  hintText="Cena prevoza (RSD)"
					  fullWidth= {true}
			   		floatingLabelText="Cena prevoza (RSD)"
			     	type="number"
			     	style={formStyles.field}
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>

					<div>
	          <Field
	            name="time"
	            component={TimePicker}
	            fullWidth= {true}
	            format={null}
	            hintText="Vreme polaska"
	          />
	        </div>
					
					<div>
	          <Field
	            name="frequency"
	            component={SelectField}
	            hintText="Učestalost prevoza"
	            fullWidth= {true}
	            style={formStyles.field}
	            labelStyle={formStyles.selectLabelStyle}
	            floatingLabelStyle={formStyles.selectFloatingLabelStyle}
	            floatingLabelText="Učestalost prevoza"
	            onChange={(value) => this.handleFreqChange(value)}
	          >
	          	<MenuItem value="2" primaryText="Samo jedna vožnja" />
	          	<MenuItem value="3" primaryText="Svakog dana" />
	            <MenuItem value="4" primaryText="Svakog radnog dana" />
	            <MenuItem value="5" primaryText="Samo vikendom" />
	          </Field>
	        </div>

	        <div style={{display: 'none'}} id="singleDate">
						<Field
	            name="date"
	            component={DatePicker}
	            minDate={new Date()}
	            fullWidth= {true}
	            format={null}
	            hintText="Na dan"
	          />
	        </div>

	        <div>
	        	<div style={formStyles.headline}>Broj slobodnih mesta: {spots}</div>
	          <Field
	            name="spots"
	            component={Slider}
	            defaultValue={0}
	            format={null}
	            sliderStyle={formStyles.sliderStyle}
	            min={0}
	            max={3}
	            step={1}
	          />
	        </div>

				   <FlatButton
				  	label="NAZAD"
				    backgroundColor="#4885ed"
				    hoverColor="#4377d0"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				    onClick={() => this.props.onBack()}
				   />
						<br/>
						<br/>
				   <FlatButton
						type="submit"
				  	label="DALJE"
				    backgroundColor="#43c978"
				    hoverColor="#24b35d"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				   />

			</form>
			
		);
	}
	
}

function getValues(state) {
	const def = {}

	if (state.form.hasOwnProperty('routeInfo')) {
		if (state.form.routeInfo.hasOwnProperty('values')) {
			state.form.routeInfo.values.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
			if (startPlace) {
				state.form.routeInfo.values.start = startPlace;
			}
			if (endPlace) {
				state.form.routeInfo.values.end = endPlace;
				state.form.routeInfo.values.endObj = endObj;
			}
			return state.form.routeInfo.values;
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
	if (!values.rate) {
		errors['rate'] = "Cena prevoza je obavezno polje";
	}
	if (!values.frequency) {
		errors['frequency'] = "Učestalost prevoza je obavezno polje";
	}
	if (!values.spots) {
		errors['spots'] = "Cena prevoza je obavezno polje";
	}
	if (!values.time) {
		errors['time'] = "Broj slobodnih mesta je obavezno polje";
	}

	if (values.frequency === 2) {
		if (!values.date) {
			errors['date'] = "U slučaju pojedinačne vožnje, na dan je obavezno polje";
		};
	};

	return errors;
}


function mapStateToProps(state){
	
	return {routeInfo: getValues(state), error: state.error };
}

RoutesForm = connect(mapStateToProps, actions)(RoutesForm);

export default reduxForm({
	destroyOnUnmount: false,
	validate,
  form: 'routeInfo' // a unique name for this form
})(RoutesForm);
