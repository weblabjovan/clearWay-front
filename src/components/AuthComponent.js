import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header/Header';
import DrawerUndocked from './DrawerUndocked';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './UserSide/Dashboard';
import Routes from './UserSide/Routes';
import Messages from './UserSide/Messages';
import Search from './UserSide/Search';
import RideApp from './UserSide/RideApp';
import Profile from './UserSide/Profile';
import ForgotenPassword from './ForgotenPassword/ForgotenPassword';
import history from '../utils/history';
import { Router, Route } from "react-router-dom";


class AuthComponent extends Component {
  constructor() {
    super()

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.authLogged = this.authLogged.bind(this);
    this.authLoggedOut = this.authLoggedOut.bind(this);
  }

	state = {
    width: 0,
    open: false,
    auth: false
	}

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth});
  }

  handleDrawerToggle() {
    this.setState({open: !this.state.open});
  }

  handleDrawerClose() {
    this.setState({open: false});
  }

  authLogged(){
    this.setState({auth: true});
  }
  authLoggedOut(){
    this.setState({auth: false});
    this.props.logoutUser();
    this.handleDrawerClose();
    localStorage.removeItem('user');
    history.push('/', { some: 'state' });
  }
	
  render() {
    return (
        
        <Router history={history}>
          <div>
            <Header 
            width={this.state.width} 
            drawerOpen={this.handleDrawerToggle} 
            logout={this.authLoggedOut}
            auth={this.state.auth} />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotenpass" component={ForgotenPassword} />
            <Route path="/dashboard/:token?" render={({match}) => {
              return(
                <Dashboard login={this.authLogged} match={match} />
              )
            }} />

            <Route path="/routes" render={({match}) => {
              return(
                <Routes login={this.authLogged} match={match} />
              )
            }} />

            <Route path="/" exact render={({match}) => {
              return(
                <Home login={this.authLogged} match={match} />
              )
            }} />

            <Route path="/profile" render={({match}) => {
              return(
                <Profile login={this.authLogged} match={match} />
              )
            }} />

            <Route path="/search" render={({match}) => {
              return(
                <Search login={this.authLogged} match={match} />
              )
            }} />

            <Route path="/application" render={({match}) => {
              return(
                <RideApp login={this.authLogged} match={match} />
              )
            }} />

            <Route path="/messages" render={({match}) => {
              return(
                <Messages login={this.authLogged} match={match} />
              )
            }} />

            <DrawerUndocked 
            open={this.state.open} 
            handleDrawerClose={this.handleDrawerClose}
            drawerClose={this.handleDrawerClose} 
            auth={this.state.auth}
            logout={this.authLoggedOut} />
          </div>
          
        </Router>
        
    );
  }
}

function mapStateToProps(state){
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(AuthComponent);