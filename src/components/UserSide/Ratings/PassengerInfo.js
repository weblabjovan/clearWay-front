import React from 'react';
import TrendingFlat from 'material-ui/svg-icons/action/trending-flat';
import avatar from '../../../avatar.png';

const PassengerInfo = (props) => {
	
	return(
		<div>
			<h2 className="interHead">Vožnja {props.date} u {props.time}</h2>
			<div className="passengerInfo">
				<div className="person">
					<div className="image">
						<div className="photo-container">
							<img src={props.photo ? props.photo : avatar} className="photo" alt="avatar"/>
						</div>
					</div>
					
					<div className="info">
						<h5>{props.name}</h5>
						<h5>{props.car}</h5>
					</div>
				</div>
				<div style={{clear:'both'}}></div>

				<div className="ride">
					<div className="box">
						<h5>{props.start}</h5>
					</div>
					<div className="middle">
						<TrendingFlat style={{color:'#43c978', height: '42px', width: '42px', marginTop:'-5px'}} />
					</div>
					<div className="box">
						<h5>{props.end}</h5>
					</div>
					<div style={{clear:'both'}}></div>
				</div>
			</div>

		</div>

		
	)
}


export default PassengerInfo;