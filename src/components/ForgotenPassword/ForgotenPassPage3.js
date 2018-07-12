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

class NewPassThree extends Component {

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
					page="Forget3"
				/>
		this.props.clearError();
	}

	render() {

		return(
				<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.changePassword({email:this.props.email, password: this.props.newPassValues.password}))}>
					<p className="paragraphGen">Kreirajte i potvrdite novu lozinku u poljima u nastavku.</p>
					<Field
						component={TextField}
						name="password"
					  hintText="New password"
					  fullWidth= {true}
			   		floatingLabelText="New password"
			     	type="password"
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>
					<br />
					<Field
						component={TextField}
						name="re_password"
					  hintText="Confirm new password"
					  fullWidth= {true}
			   		floatingLabelText="Confirm new password"
			     	type="password"
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>
					<br />
					<FlatButton
						type="submit"
				  	label="change"
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
	const def = {
		email: "",
		password: ""
	}
	if (state.form.hasOwnProperty('newPassValues')) {
		if (state.form.newPassValues.hasOwnProperty('values')) {
			return state.form.newPassValues.values;
		}
		return def;	
	}
	return def;
}

function validate(values) {
	const errors = {};

	if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(values.password)) {
		errors['password'] = "Password should contain 8 characters at least one letter, one number and one special character";
	}
	if (!values.password) {
		errors['password'] = "Password is required";
	}
	if (values.password !== values.re_password) {
		errors['re_password'] = "Password is not confirmed";
	}
	if (!values.re_password) {
		errors['re_password'] = "Password is not confirmed";
	}
	

	return errors;
}

function mapStateToProps(state){
	return {newPassValues: getValues(state), auth: state.auth, error: state.error };
}

NewPassThree = connect(mapStateToProps, actions)(NewPassThree);

export default reduxForm({
	validate,
  form: 'newPassValues' // a unique name for this form
})(NewPassThree);