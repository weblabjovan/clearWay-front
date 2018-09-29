import React from 'react';
import TrendingFlat from 'material-ui/svg-icons/action/trending-flat';
import FlatButton from 'material-ui/FlatButton';
import frequencyConvert from '../../../utils/frequencyConvert';

const RoutesItem = (props) => {
	let freq = frequencyConvert(props.frequency);
	if (props.freqency === 2) {
		freq = freq + ' ' + props.date;
	}

	return(
		<div>
			<div className="routeItem">
				<div className="small">
					<div className="left">
						<span>Ocena</span>
						<h3>4.5</h3>
					</div>
					<div className="right">
						<h5>{freq}</h5>
						<h5>U {props.time}</h5>
					</div>
					<div style={{clear:'both'}}></div>
				</div>
				<div className="large">
					<div className="box">
						<h5>{props.start}</h5>
					</div>
					<div className="middle">
						<TrendingFlat style={{color:'#43c978', height: '42px', width: '42px', marginTop:'-5px'}} />
						<span>{props.price} rsd</span>
					</div>
					<div className="box">
						<h5>{props.end}</h5>
					</div>
					<div style={{clear:'both'}}></div>
				</div>
				<div>
					<FlatButton 
						label="OBRIŠI PREVOZ"
					    hoverColor="#ccc"
					    fullWidth= {true}
					    onClick={props.openModal}
					/>
				</div>
			</div>
		</div>
	)
}

export default RoutesItem;