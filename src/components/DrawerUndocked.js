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

class DrawerUndocked extends React.Component {
  
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
    await this.props.getAllMyNotifications();
  }

  getMenuItemList() {
    let notification = "";
    if (!isObjectEmpty(this.props.notification)) {
      notification = <Badge 
                    badgeContent={this.props.notification.length}
                    primary={true}
                    style={{float:'right', marginTop:'10px', marginRight:'10px'}}
                  />
    }
    if (this.props.auth) {
      return (
        <div>
          <div>
            <div style={headerStyles.profileContainer}>
              <img src={this.state.userPhoto} style={headerStyles.profileImage} alt="avatar"/>
            </div>
            <h3 style={headerStyles.profileHeader}>{this.state.userName}</h3>
          </div>

          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.props.handleDrawerClose()} style={headerStyles.drawerLink} >Profil</MenuItem>
          </Link>
          <Link to="/rides" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.props.handleDrawerClose()} style={headerStyles.drawerLink} >Moje vožnje</MenuItem>
          </Link>
          <Link to="/routes" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.props.handleDrawerClose()} style={headerStyles.drawerLink} >Ponudi prevoz</MenuItem>
          </Link>
           <Link to="/search" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.props.handleDrawerClose()} style={headerStyles.drawerLink} >Pronađi prevoz</MenuItem>
          </Link>
          <Link to="/notifications" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.props.handleDrawerClose()} style={headerStyles.drawerLink} >
              Obaveštenja
              {notification}
            </MenuItem>
          </Link>
          <Link to="/messages" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.props.handleDrawerClose()} style={headerStyles.drawerLink} >Poruke</MenuItem>
          </Link>
            <MenuItem onClick={() => this.props.logout()} style={headerStyles.drawerLink} >Odjavi se</MenuItem>
          
        </div>
      )
    }

    return (
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MenuItem onClick={() => this.props.handleDrawerClose()}>Početna</MenuItem>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <MenuItem onClick={() => this.props.handleDrawerClose()}>Prijavi se</MenuItem>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <MenuItem onClick={() => this.props.handleDrawerClose()}>Registruj se</MenuItem>
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={220}
          open={this.props.open}
          onRequestChange={this.props.drawerClose}
        >
        
        {this.getMenuItemList()}
          
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {notification: state.notification, error: state.error };
}

export default connect(mapStateToProps, actions)(DrawerUndocked);