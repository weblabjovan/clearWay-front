import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from "react-router-dom";
import avatar from '../avatar.png';
import headerStyles from '../styles/headerStyles';

export default class DrawerDocked extends React.Component {

  render() {

  	if (this.props.auth && this.props.width > 770) {
		return (
	      <div>
	        <Drawer
	          variant="permanent"
	          containerStyle={{marginTop: '65px'}}
	        >
	        
	        <div>
	          <div>
	            <div style={headerStyles.profileContainer}>
	              <img src={avatar} style={headerStyles.headerImage} alt="avatar"/>
	            </div>
	            <h3 style={headerStyles.profileHeader}>Jovan Šutić</h3>
	          </div>

	          <Link to="/profile" style={{ textDecoration: 'none' }}>
	            <MenuItem style={headerStyles.drawerLink} >Profil</MenuItem>
	          </Link>
	          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
	            <MenuItem  style={headerStyles.drawerLink} >Moje vožnje</MenuItem>
	          </Link>
	          <Link to="/routes" style={{ textDecoration: 'none' }}>
	            <MenuItem style={headerStyles.drawerLink} >Ponudi prevoz</MenuItem>
	          </Link>
	           <Link to="/search" style={{ textDecoration: 'none' }}>
	            <MenuItem style={headerStyles.drawerLink} >Pronađi prevoz</MenuItem>
	          </Link>
	          <Link to="/messages" style={{ textDecoration: 'none' }}>
	            <MenuItem style={headerStyles.drawerLink} >Poruke</MenuItem>
	          </Link>
	          
	        </div>
	          
	        </Drawer>
	      </div>
	    );
  	}else{
  		return(
			<div></div>
  		)
  	}
    
  }
}