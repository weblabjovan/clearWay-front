import React from 'react';
import { Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';
import avatar from '../../../avatar.png';
import buttonStyles from '../../../styles/buttonStyles';

const SearchItem = (props) => {
	return(
		<div className="searchItem">
			<div className="side l-side">
				<div className="image">
					<img src={avatar} alt="avatar"/>
				</div>
				<span className="name">{props.name}</span>
				<span className="rate">4.7</span>
			</div>
			<div className="side r-side">
				<div className="row">
					<span className="label">Kreće od:</span>
					<span className="line">{props.start}</span>
				</div>
				<div className="row">
					<span className="label">Završava u:</span>
					<span className="line">{props.end}</span>
				</div>
				<div className="row">
					<span className="label">Polazak u:</span>
					<span className="line">{props.time}</span>
				</div>
				<div className="row">
					<span className="label">Cena vožnje:</span>
					<span className="line">{props.price} rsd</span>
				</div>
				<div className="row">
					<span className="label">Vožnja u:</span>
					<span className="line">{props.car}</span>
				</div>
				<div className="row">
					<span className="label">Blizina prolaza:</span>
					<span className="line">100m od vašeg polazišta</span>
				</div>
			</div>
			
			<Link to="/application" style={{ textDecoration: 'none' }}>
				<FlatButton
					type="submit"
					label="prijavi se"
					backgroundColor="#4e6a9a"
					className="search-button"
					labelStyle={buttonStyles.headerLabel}
					onClick={props.button}
				/>
	        </Link>
			

		</div>
	)
}

export default SearchItem;