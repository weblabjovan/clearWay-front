import React from 'react';
import AppBar from 'material-ui/AppBar';
import HeaderList from './HeaderList';
import HeaderLogo from './HeaderLogo';
import headerStyles from '../../styles/headerStyles';

const Header = (props) => {
	
	const isMobile = () => {
		if (props.width > 770) {
			return false;
		}

		return true;
	}

	const headerList = () => {
		if (isMobile()) {
			return null;
		}else{
			return <HeaderList auth={props.auth} logout={props.logout} />
		}
	}

	const headerLogo = () => {
		if (isMobile()) {
			return false;
		}else{
			return <HeaderLogo />
		}
	}
	
	return(
		<AppBar
			style={headerStyles.header} 
			onLeftIconButtonClick={props.drawerOpen}
			showMenuIconButton={isMobile()}
			iconElementRight={headerList()}
			title={headerLogo()}
		/>
	)
}

export default Header;