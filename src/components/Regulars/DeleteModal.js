import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DeleteModal extends Component {

	render() {
		const actions = [
	      <FlatButton
	        label={this.props.labelCancel}
	        primary={true}
	        onClick={this.props.handleClose}
	      />,
	      <FlatButton
	        label={this.props.labelSuccess}
	        primary={true}
	        onClick={this.props.handleSuccess}
	      />,
	    ];

		return(
			<Dialog
	          actions={actions}
	          modal={false}
	          open={this.props.open}
	          onRequestClose={this.props.handleClose}
	        >
	          {this.props.message}
	        </Dialog>
		)
	}
	
}

export default DeleteModal;