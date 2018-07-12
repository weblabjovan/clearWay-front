import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import ErrorBar from '../Regulars/ErrorBar';
import formStyles from '../../styles/formStyles';
import buttonStyles from '../../styles/buttonStyles';
import isObjectEmpty from '../../utils/isObjectEmpty';
import * as actions from '../../actions';
import '../../css/mediaQueries.css';

class NewPassTwo extends Component {

	constructor() {
		super();

		this.err = <div></div>;
	}

	shouldComponentUpdate(){
		if (isObjectEmpty(this.props.error)) {
			return false;
		}
		return true;
	}

	componentDidUpdate() {
		this.err = <ErrorBar 
					error={this.props.error.data}
					page="Forget2"
				/>
		this.props.clearError();
	}

	render() {

		return(

			<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.checkPasscode({email:this.props.email, passcode: this.props.codeCheckValues.passcode}))}>
				<p className="paragraphGen">Na email vam je poslat sigurnosni kod, molim vas kopirajte kod i unesite ga u polje u nastavku.</p>
					<Field
						component={TextField}
						name="passcode"
					  hintText="Code"
					  fullWidth= {true}
			   		floatingLabelText="Code"
			     	type="text"
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>
					<br />
					<FlatButton
						type="submit"
				  	label="Check"
				    backgroundColor="#43c978"
				    hoverColor="#24b35d"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				   />
					{this.err}
				   
			</form>	
		)
	}
}

function getValues(state) {
	const def = {};

	if (state.form.hasOwnProperty('codeCheckValues')) {
		if (state.form.codeCheckValues.hasOwnProperty('values')) {
			return state.form.codeCheckValues.values;
		}
		return def;	
	}
	return def;
}

function validate(values) {
	const errors = {};
	if (values.passcode) {
		if (values.passcode.length != 8) {
			errors['passcode'] = "Potrebno je upisati validan sigurnosni kod";
		}
	}

	if (!values.passcode) {
			errors['passcode'] = "Potrebno je upisati validan sigurnosni kod";
		}
	
	return errors;
}

function mapStateToProps(state){
	return {codeCheckValues: getValues(state), auth: state.auth, error: state.error };
}

NewPassTwo = connect(mapStateToProps, actions)(NewPassTwo);

export default reduxForm({
	validate,
    form: 'codeCheckValues' // a unique name for this form
})(NewPassTwo);