import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  TextField, SelectField, DatePicker, Toggle
} from 'redux-form-material-ui';
import { MenuItem, FlatButton, RaisedButton } from 'material-ui';
import formStyles from '../../styles/formStyles';
import buttonStyles from '../../styles/buttonStyles';
import * as actions from '../../actions';
import fillProfile from '../../utils/profileFill';
import history from '../../utils/history';
import LinkKey from '../../utils/linkKeys';
import isUserLogged from '../../utils/isUserLogged';
import axios from 'axios';
import avatar from '../../avatar.png';


class Profile extends Component {
	constructor() {
		super();
		
		this.changeUserType = this.changeUserType.bind(this);
		this.onFileChange = this.onFileChange.bind(this);
		

		this.state = {
			userType: 'Putnik',
			photoFile: null
		}
	}

	onFileChange(event) {
		this.setState({
			photoFile: event.target.files[0]
		})
	}

	changeUserType() {
		if (this.state.userType === 'Putnik') {
			this.setState({
				userType: 'Vozač'
			})
			document.getElementById("driverForm").style.display = 'block';
		}else{
				this.setState({
					userType: 'Putnik'
				})
				document.getElementById("driverForm").style.display = 'none';
		}
	}

	getYears(minus) {
		const d = new Date();
		let y = [];
		for (var i = 0; i < 50; i++) {
			let year = (d.getFullYear() - minus) - i;
			y.push(<MenuItem value={year} primaryText={year} key={year}/>)
		}

		return y;
	}

	async componentWillMount() {
		if (!await isUserLogged()) {
			history.push('/', { some: 'state' });
		}else{
			this.props.login();
		}
	}

	async componentDidMount() {
		const link = LinkKey('/api/user');
		const user = await axios.get(link);
		if (user.data.userType === 'true') {
			this.setState({
				userType: 'Vozač'
			})
			document.getElementById("driverForm").style.display = 'block';
		}

		this.props.initialize(fillProfile(user.data));
	}

	render() {
		const years = this.getYears(18);
		const modelYears = this.getYears(0);

		return(
			<div style={formStyles.containerStyle}>
				<h1 className="headlineGen">Tvoj profil</h1>
				<form style={formStyles.form} onSubmit={this.props.handleSubmit(() => this.props.updateUser(this.props.profile, this.state.photoFile))}>
					<div style={formStyles.avatarContainer} >
						<img src={avatar} style={formStyles.avatarImage} />
					</div>
					<RaisedButton
						onChange={this.onFileChange}
					   containerElement='label' // <-- Just add me!
					   label='Izaberi profilnu fotografiju'>
					   <input type="file" accept="image/*" style={{display:'none'}} />
					</RaisedButton>

					<Field
						ref="Name"
						withRef={true}
						component={TextField}
						name="name"
					  hintText="Ime i prezime"
					  fullWidth= {true}
			   		floatingLabelText="Ime i prezime"
			     	type="text"
			     	style={formStyles.field}
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabel}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>

					<Field
						component={TextField}
						name="email"
					  hintText="Email"
					  fullWidth= {true}
			   		floatingLabelText="Email"
			     	type="text"
			     	style={formStyles.field}
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabel}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>

					<Field
						component={TextField}
						name="phone"
					  hintText="Broj telefona"
					  fullWidth= {true}
			   		floatingLabelText="Broj telefona"
			     	type="text"
			     	style={formStyles.field}
			     	floatingLabelStyle={formStyles.floatingLabelStyle}
			     	floatingLabelFocusStyle={formStyles.floatingLabel}
			     	underlineFocusStyle={formStyles.underlineStyle}
					/>

					<Field
	            name="gender"
	            component={SelectField}
	            hintText="Pol"
	            fullWidth= {true}
	            style={formStyles.field}
	            labelStyle={formStyles.selectLabelStyle}
	            floatingLabelStyle={formStyles.selectFloatingLabelStyle}
	            floatingLabelText="Pol"
	          >
	            <MenuItem value="male" primaryText="Muški" key="1"/>
	            <MenuItem value="female" primaryText="Ženski" key="2"/>
	          </Field>

	          <Field
	            name="birthYear"
	            component={SelectField}
	            hintText="Godina rođenja"
	            fullWidth= {true}
	            style={formStyles.field}
	            labelStyle={formStyles.selectLabelStyle}
	            floatingLabelStyle={formStyles.selectFloatingLabelStyle}
	            maxHeight={200}
	            floatingLabelText="Godina rođenja"
	          >{years}
	          </Field>

	          <Field
	            name="userType"
	            component={Toggle}
	            label={this.state.userType}
	            labelPosition="right"
	            onChange={() => this.changeUserType()}
	          >
	          </Field>

	          <div id="driverForm" style={{display:'none'}}>
							<Field
								component={TextField}
								name="model"
							  hintText="Model vozila"
							  fullWidth= {true}
					   		floatingLabelText="Model vozila"
					     	type="text"
					     	style={formStyles.field}
					     	floatingLabelStyle={formStyles.floatingLabelStyle}
					     	floatingLabelFocusStyle={formStyles.floatingLabel}
					     	underlineFocusStyle={formStyles.underlineStyle}
							/>

	          	<Field
								component={TextField}
								name="modelNumber"
							  hintText="Registarski broj vozila"
							  fullWidth= {true}
					   		floatingLabelText="Registarski broj vozila"
					     	type="text"
					     	style={formStyles.field}
					     	floatingLabelStyle={formStyles.floatingLabelStyle}
					     	floatingLabelFocusStyle={formStyles.floatingLabel}
					     	underlineFocusStyle={formStyles.underlineStyle}
							/>

							<Field
		            name="modelYear"
		            component={SelectField}
		            hintText="Godište vozila"
		            fullWidth= {true}
		            style={formStyles.field}
		            labelStyle={formStyles.selectLabelStyle}
		            floatingLabelStyle={formStyles.selectFloatingLabelStyle}
		            maxHeight={200}
		            floatingLabelText="Godište vozila"
		          >{modelYears}
	          	</Field>
	          </div>

	          <FlatButton
							type="submit"
					  	label="SAČUVAJ"
					    backgroundColor="#43c978"
					    hoverColor="#24b35d"
					    fullWidth= {true}
					    style={buttonStyles.formButton}
					    labelStyle={buttonStyles.headerLabel}
					  />

				</form>
			</div>
			
		);
	}
	
}



function getValues(state) {
	const def = {}

	if (state.form.hasOwnProperty('profile')) {
		if (state.form.profile.hasOwnProperty('values')) {
			return state.form.profile.values;
		}
		return def;	
	}
	return def;
}

function mapStateToProps(state){
	return { profile: getValues(state), error: state.error };
}

Profile = connect(mapStateToProps, actions)(Profile);

export default reduxForm({
  form: 'profile' // a unique name for this form
})(Profile);