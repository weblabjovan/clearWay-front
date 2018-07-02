import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { connect } from 'react-redux';
import formStyles from '../styles/formStyles';
import buttonStyles from '../styles/buttonStyles';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';
import emailValidate from '../utils/emailValidate';
import errorHandler from '../utils/errorHandler';
import ErrorReporting from 'material-ui-error-reporting';
import history from '../utils/history';
import '../css/mediaQueries.css';

class Signup extends Component {

	componentDidUpdate() {
		if (typeof this.props.auth === 'string') {
			history.push('/dashboard', { some: 'state' })
		}
	}

	componentDidMount(){
		this.props.clearError();
	}

	openError(reopen){
		reopen = reopen || null
		if (this.props.error.data && reopen) {
			return true;
		}
		return false
	}

	render() {
		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Registracija</h1>
				<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.signupUser(this.props.signValues))}>
					<Field
						name="sign_username"
						component={TextField}
				    hintText="Korisničko ime"
				    fullWidth= {true}
			     	floatingLabelText="Korisničko ime"
			     	type="text"
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>
					<br />
					<Field
						name="sign_email"
						component={TextField}
				    hintText="Email"
				    fullWidth= {true}
			     	floatingLabelText="Email"
			     	type="text"
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>
					<br />
					<Field
						name="sign_pass"
						component={TextField}
				    hintText="Lozinka"
				    fullWidth= {true}
			     	floatingLabelText="Lozinka"
			     	type="password"
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>
					  
					<br />
					<Field
						name="sign_repass"
						component={TextField}
				    hintText="Potvrdi lozinku"
				    fullWidth= {true}
		      	floatingLabelText="Potvrdi lozinku"
		      	type="password"
		      	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
		      	underlineFocusStyle={formStyles.underlineStyle}
					/>
					<FlatButton
						type="submit"
				  	label="registruj se"
				    backgroundColor="#43c978"
				    hoverColor="#24b35d"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				  />
					<br />
				</form>

				<FlatButton
			  	label="Google registracija"
			    backgroundColor="#4885ed"
			    hoverColor="#4377d0"
			    fullWidth= {true}
			    labelStyle={buttonStyles.headerLabel}
			    href='/api/auth/google'
			  />
				<br />
			  <FlatButton
				  label="Facebook registracija"
				  backgroundColor="#3b5998"
				  hoverColor="#1d2c4b"
				  fullWidth= {true}
				  labelStyle={buttonStyles.headerLabel}
				  style={buttonStyles.formButton}
			  />

			  <ErrorReporting
          open={this.openError(true)}
          message={errorHandler(this.props.error.data, 'Signup')}
          style={{backgroundColor:'#E24444'}}
          autoHideDuration={5000}
          onRequestClose={this.openError()}
        />

			</div>
		);
	}
	
}

function validate(values) {
	const errors = {};

	if (!values.sign_username) {
		errors['sign_username'] = "Username is required";
	}
	if (!emailValidate(values.sign_email)) {
		errors['sign_email'] = "Valid email is required";
	}
	if (!values.sign_email) {
		errors['sign_email'] = "Email is required";
	}
	if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(values.sign_pass)) {
		errors['sign_pass'] = "Password should contain 8 characters at least one letter, one number and one special character";
	}
	if (!values.sign_pass) {
		errors['sign_pass'] = "Password is required";
	}
	if (values.sign_pass !== values.sign_repass) {
		errors['sign_repass'] = "Password is not confirmed";
	}
	if (!values.sign_repass) {
		errors['sign_repass'] = "Password is not confirmed";
	}
	

	return errors;
}

function getValues(state) {
	const def = {
		sign_username: "",
		sign_email: "",
		sign_pass: ""
	}

	if (state.form.hasOwnProperty('signupForm')) {
		if (state.form.signupForm.hasOwnProperty('values')) {
			return state.form.signupForm.values;
		}
		return def;	
	}
	return def;
}


function mapStateToProps(state){
	return {signValues: getValues(state), auth: state.auth, error: state.error };
}


Signup = connect(mapStateToProps, actions)(Signup);

export default reduxForm({
		validate,
    form: 'signupForm' // a unique name for this form
})(Signup);