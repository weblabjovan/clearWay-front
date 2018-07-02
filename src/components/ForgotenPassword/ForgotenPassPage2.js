import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import ErrorReporting from 'material-ui-error-reporting';
import formStyles from '../../styles/formStyles';
import buttonStyles from '../../styles/buttonStyles';
import errorHandler from '../../utils/errorHandler';
import * as actions from '../../actions';
import '../../css/mediaQueries.css';

class NewPassTwo extends Component {

	constructor() {
		super();

		this.errorOpen = false;
		this.changeErrorOpen = this.changeErrorOpen.bind(this);
	}

	shouldComponentUpdate(){
		if (this.props.error.data && this.errorOpen) {
			return true;
		}
		return false;
	}

	changeErrorOpen(){
		this.errorOpen = true;
	}

	getErrorOpen(){
		return this.errorOpen;
	}

	closeError(){
		this.errorOpen = false;
		this.props.clearError();
	}

	render() {
		return(

				<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.checkPasscode({email:this.props.email, passcode: this.props.codeCheckValues.passcode}))}>
					<p className="paragraphGen">We have sent you your security code. Please check your email and paste your code in the field bellow.</p>
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
				    onClick={() => this.changeErrorOpen()}
				   />

				   <ErrorReporting
	          open={this.getErrorOpen()}
	          message={errorHandler(this.props.error.data, 'Forget2')}
	          style={{backgroundColor:'#E24444'}}
	          autoHideDuration={5000}
	          onRequestClose={this.closeError()}
	        />
				</form>	
		)
	}
}

function getValues(state) {
	const def = {
		email: "",
		passcode: ""
	}

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
	if (!values.passcode) {
		errors['passcode'] = "Code is required";
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