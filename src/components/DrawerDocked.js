import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import { Link } from "react-router-dom";
import avatar from '../avatar.png';
import headerStyles from '../styles/headerStyles';
import isObjectEmpty from '../utils/isObjectEmpty';
import LinkKey from '../utils/linkKeys';

class DrawerDocked extends React.Component {

	constructor() {
	    super();
	    

	    this.state = {
	      userPhoto: avatar,
	      userName: ''
	    }
	}

	async componentDidMount() {
		const link = LinkKey('/api/user');
    const user = await axios.get(link);
    if (user.data.photo) {
      this.setState({
        userPhoto: `https://s3.us-east-2.amazonaws.com/claro-profile-bucket/${user.data.photo}`
      })
    }
    this.setState({
      userName: user.data.username
    })
		await this.props.getAllMyNotifications()
	}

  render() {
  	let notification = "";
	if (!isObjectEmpty(this.props.notification)) {
		notification = <Badge 
	                badgeContent={this.props.notification.length}
	                primary={true}
	                style={{float:'right', marginTop:'-36px', marginRight:'30px'}}
	              />
	}
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
	              <img src={this.state.userPhoto} style={headerStyles.profileImage} alt="avatar"/>
	            </div>
	            <h3 style={headerStyles.profileHeader}>{this.state.userName}</h3>
	          </div>

	          <Link to="/profile" style={{ textDecoration: 'none' }}>
	            <MenuItem style={headerStyles.drawerLink} >Profil</MenuItem>
	          </Link>
	          <Link to="/rides" style={{ textDecoration: 'none' }}>
	            <MenuItem  style={headerStyles.drawerLink} >Moje vožnje</MenuItem>
	          </Link>
	          <Link to="/routes" style={{ textDecoration: 'none' }}>
	            <MenuItem style={headerStyles.drawerLink} >Ponudi prevoz</MenuItem>
	          </Link>
	           <Link to="/search" style={{ textDecoration: 'none' }}>
	            <MenuItem style={headerStyles.drawerLink} >Pronađi prevoz</MenuItem>
	          </Link>
	          <Link to="/notifications" style={{ textDecoration: 'none' }}>
	            <MenuItem style={headerStyles.drawerLink} >Obaveštenja</MenuItem>
	            {notification}
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


function mapStateToProps(state){
	return {notification: state.notification, error: state.error };
}

export default connect(mapStateToProps, actions)(DrawerDocked);