import React, { Component } from 'react';
import history from '../../utils/history';
import isUserLogged from '../../utils/isUserLogged';
import loaderControllor from '../../utils/loaderControllor';

class Dashboard extends Component {

	async componentWillMount() {
		
		if (this.props.match.params.token) {
			localStorage.setItem('user', this.props.match.params.token);
			history.push('/Dashboard', { some: 'state' });
			this.props.login()
		}else{
			if (!await isUserLogged()) {
				history.push('/', { some: 'state' });
			}else{
				this.props.login();
			}
		}
	}

	componentDidMount() {
		loaderControllor('off');
	}

	render() {
		return(
			<div style={{textAlign: 'center'}}>
				<h1>This is Dashboard page</h1>
			</div>
			
		);
	}
	
}


export default Dashboard;