import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import buttonStyles from '../../styles/buttonStyles';
import { Link } from "react-router-dom";

const HeaderList = (props) => {
	const list = () => {
		
		if (!props.auth) {
			return (
				<div>
				 <Link to="/login">
					<FlatButton 
					style={buttonStyles.transparentButton}
					label="Prijava"
					hoverColor="#5e72a2"
					labelStyle={buttonStyles.headerLabel} />
				 </Link>

				 <Link to="/signup">
					<FlatButton 
					style={buttonStyles.transparentButton}
					hoverColor="#24b35d"
					label="Registracija"
					labelStyle={buttonStyles.headerLabel} />
				 </Link>
					
					
				</div>
			)
		}

		return <FlatButton 
					onClick={() => props.logout()}
					style={buttonStyles.transparentButton}
					hoverColor="#5e72a2"
					label="Odjava"
					labelStyle={buttonStyles.headerLabel} />
	}
	return(
		<div>
			{list()}
		</div>
		
	)
}

export default HeaderList;