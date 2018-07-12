import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import ErrorBar from '../Regulars/ErrorBar';
import formStyles from '../../styles/formStyles';
import buttonStyles from '../../styles/buttonStyles';
import emailValidate from '../../utils/emailValidate';
import isObjectEmpty from '../../utils/isObjectEmpty';
import * as actions from '../../actions';
import '../../css/mediaQueries.css';


class NewPassOne extends Component {

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
					page="Forget1"
				/>
		this.props.clearError();
	}

	render() {

		return(

			<div>
				
				<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.findUserByEmail(this.props.emailCheckValues))}>
					<p className="paragraphGen">Unesite svoj email kako bi mogli da vam pošaljemo sigurnosni kod za promenu lozinke.</p>
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
				   />
				</form>	
				
				{this.err}

			</div>

				
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
		errors['email'] = "Unešeni email nije validan.";
	}
	if (!values.email) {
		errors['email'] = "Unešeni email nije validan.";
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