import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import { Link } from "react-router-dom";
import ErrorBar from './Regulars/ErrorBar';
import formStyles from '../styles/formStyles';
import buttonStyles from '../styles/buttonStyles';
import emailValidate from '../utils/emailValidate';
import isObjectEmpty from '../utils/isObjectEmpty';
import LinkKey from '../utils/linkKeys';
import * as actions from '../actions';
import '../css/mediaQueries.css';


class Login extends Component {

	constructor() {
		super()

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
					page="Login"
				/>
		this.props.clearError();

	}


	componentDidMount(){
		this.props.clearError();
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
				    href={LinkKey('/api/auth/google')}
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
				
				
				{this.err}
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