import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from "react-router-dom";
import avatar from '../avatar.png';
import headerStyles from '../styles/headerStyles';

export default class DrawerUndocked extends React.Component {

  getMenuItemList() {
    if (this.props.auth) {
      return (
        <div>
          <div>
            <div style={headerStyles.profileContainer}>
              <img src={avatar} style={headerStyles.headerImage} alt="avatar"/>
            </div>
            <h3 style={headerStyles.profileHeader}>Jovan Šutić</h3>
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