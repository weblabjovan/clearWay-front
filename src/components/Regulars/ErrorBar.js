import React, { Component } from 'react';
import ErrorReporting from 'material-ui-error-reporting';
import errorHandler from '../../utils/errorHandler';

class ErrorBar extends Component {

	closeError() {

	}

	render() {
		return(
			<div>
				<ErrorReporting
			          open={true}
			          message={errorHandler(this.props.error, this.props.page)}
			          style={{backgroundColor:'#E24444'}}
			          autoHideDuration={5000}
			          onRequestClose={this.closeError()}
			        />
			</div>
		)
	}

	
}

export default ErrorBar;