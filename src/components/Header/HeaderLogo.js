import React from 'react';
import headerStyles from '../../styles/headerStyles';
import logo from '../../logo.png'
import { Link } from "react-router-dom";

const HeaderLogo = (props) => {

	return(
		<div style={headerStyles.headerImageWrapper}>
			<Link to="/">
				<img src={logo} style={headerStyles.headerImage} alt="logo"/>
			</Link>
		</div>
		
	)
}

export default HeaderLogo;