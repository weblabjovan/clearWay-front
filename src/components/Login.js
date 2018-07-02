import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import formStyles from '../styles/formStyles';
import buttonStyles from '../styles/buttonStyles';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';
import emailValidate from '../utils/emailValidate';
import errorHandler from '../utils/errorHandler';
import ErrorReporting from 'material-ui-error-reporting';
import { Link } from "react-router-dom";
import history from '../utils/history';
import '../css/mediaQueries.css';

class Login extends Component {
	
	openError(reopen){
		reopen = reopen || null
		if (this.props.error.data && reopen) {
			return true;
		}
		return false
	}

	componentDidMount(){
		this.props.clearError();
	}

	componentDidUpdate() {
		if (typeof this.props.auth === 'string') {
			history.push('/dashboard', { some: 'state' })
		}
	}

	render(){

		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Prijava</h1>
				
				<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.loginUser(this.props.loginValues))}>
					<Field
						component={TextField}
						name="log_email"
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
						component={TextField}
			  		name="log_pass"
			    	hintText="Lozinka"
			    	fullWidth= {true}
			     	floatingLabelText="Lozinka"
			     	type="password"
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>
					<br />
					<FlatButton
						type="submit"
				  	label="prijavi se"
				    backgroundColor="#43c978"
				    hoverColor="#24b35d"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				    onClick={this.loginClicked}
				   />
				   <Link to="/forgotenpass" className="forgotPass" >Zaboravili ste lozinku?</Link>
				</form>	

				<FlatButton
				  	label="Google prijava"
				   	backgroundColor="#4885ed"
				    hoverColor="#4377d0"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				    href='/api/auth/google'
			  	/>
				<br />
				<FlatButton
				    label="Facebook prijava"
				    backgroundColor="#3b5998"
				    hoverColor="#1d2c4b"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				    style={buttonStyles.formButton}
				/>
				<ErrorReporting
          open={this.openError(true)}
          message={errorHandler(this.props.error.data, 'Login')}
          style={{backgroundColor:'#E24444'}}
          autoHideDuration={5000}
          onRequestClose={this.openError()}
        />

			</div>
			
		);
	}
	
}

function getValues(state) {
	const def = {
		log_email: "",
		log_pass: ""
	}

	if (state.form.hasOwnProperty('loginForm')) {
		if (state.form.loginForm.hasOwnProperty('values')) {
			return state.form.loginForm.values;
		}
		return def;	
	}
	return def;
}

function validate(values) {
	const errors = {};
	
	if (!emailValidate(values.log_email)) {
		errors['log_email'] = "Valid email is required";
	}
	if (!values.log_email) {
		errors['log_email'] = "Email is required";
	}
	if (!values.log_pass) {
		errors['log_pass'] = "Password is required";
	}
	

	return errors;
}

function mapStateToProps(state){
	return {loginValues: getValues(state), auth: state.auth, error: state.error };
}

Login = connect(mapStateToProps, actions)(Login);

export default reduxForm({
	validate,
    form: 'loginForm' // a unique name for this form
})(Login);