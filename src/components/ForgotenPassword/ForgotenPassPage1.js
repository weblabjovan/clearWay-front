import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import ErrorReporting from 'material-ui-error-reporting';
import formStyles from '../../styles/formStyles';
import buttonStyles from '../../styles/buttonStyles';
import emailValidate from '../../utils/emailValidate';
import errorHandler from '../../utils/errorHandler';
import * as actions from '../../actions';
import '../../css/mediaQueries.css';


class NewPassOne extends Component {

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
				
				<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.findUserByEmail(this.props.emailCheckValues))}>
					<p className="paragraphGen">Enter your email so we can send you security code for your password change.</p>
					<Field
						component={TextField}
						name="email"
					  hintText="Email"
					  fullWidth= {true}
			   		floatingLabelText="Email"
			     	type="text"
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabelFocusStyle}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>
					<br />
					<FlatButton
						type="submit"
				  	label="SEND"
				    backgroundColor="#43c978"
				    hoverColor="#24b35d"
				    fullWidth= {true}
				    labelStyle={buttonStyles.headerLabel}
				    onClick={() => this.changeErrorOpen()}
				   />
				   <ErrorReporting
	          open={this.getErrorOpen()}
	          message={errorHandler(this.props.error.data, 'Forget1')}
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
		email: ""
	}

	if (state.form.hasOwnProperty('emailCheckValues')) {
		if (state.form.emailCheckValues.hasOwnProperty('values')) {
			return state.form.emailCheckValues.values;
		}
		return def;	
	}
	return def;
}

function validate(values) {
	const errors = {};

	if (!emailValidate(values.email)) {
		errors['email'] = "Valid email is required";
	}
	if (!values.email) {
		errors['email'] = "Email is required";
	}
	

	return errors;
}

function mapStateToProps(state){
	return {emailCheckValues: getValues(state), auth: state.auth, error: state.error };
}

NewPassOne = connect(mapStateToProps, actions)(NewPassOne);

export default reduxForm({
		validate,
    form: 'emailCheckValues' // a unique name for this form
})(NewPassOne);