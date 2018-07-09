import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loader = (props) => {
	return(
		<div className="loader" id="loader">
			<div className="loader-container">
				<CircularProgress />
			</div>
		</div>
	)
}

export default Loader;