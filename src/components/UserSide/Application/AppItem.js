import React from 'react';
import buttonStyles from '../../../styles/buttonStyles';
import avatar from '../../../avatar.png';
import { FlatButton } from 'material-ui';

const AppItem = (props) => {
	return (
		<div className="applicationItem">
			<div className="user">
				<div className="image">
					<img src={avatar} alt="avatar"/>
				</div>
				<span className="name">{props.name}</span>
				<span className="rate">4.7</span>
			</div>

			<div className="info">
				<div className="row">
					<span className="label">Kreće od:</span>
					<span className="line">{props.start}</span>
				</div>
				<div className="row">
					<span className="label">Završava u:</span>
					<span className="line">{props.end}</span>
				</div>
				<div className="row">
					<span className="label">Cena vožnje:</span>
					<span className="line">{props.price} rsd</span>
				</div>
				<div className="row">
					<span className="label">Dan vožnje:</span>
					<span className="line">{props.date}</span>
				</div>
				<div className="row">
					<span className="label">Očekivano vreme sastajanja:</span>
					<span className="line">{props.time}</span>
				</div>
				<div className="row">
					<span className="label">Očekivana udaljenost sastajanja:</span>
					<span className="line">{props.distance}m od pretraženog polazišta</span>
				</div>
				<div className="row">
					<span className="label">Očekivano trajanje vožnje:</span>
					<span className="line">{props.duration} minuta</span>
				</div>
				<div className="row">
					<span className="label">Potencijalni popust:</span>
					<span className="line">{props.discount}%</span>
				</div>

				<FlatButton
					type="submit"
					label="pošalji rezervaciju"
					backgroundColor="#43c978"
					hoverColor="#24b35d"
					fullWidth= {true}
					style={buttonStyles.formButton}
					labelStyle={buttonStyles.headerLabel}
					onClick={props.send}
				/>
			</div>

		</div>
	)
}

export default AppItem;