import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import * as actions from '../actions';

import AuthComponent from './AuthComponent';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
      	<AuthComponent />
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
