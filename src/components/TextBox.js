import React from 'react';

const TextBox = (props) => {
	return (
		<div className="textBox" >
			<label htmlFor={props.name} >Test</label>
			<input type={props.type} name={props.name} placeholder={props.placeholder} ></input>
		</div>
	)
}

export default TextBox;
