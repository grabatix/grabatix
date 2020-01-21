import React from "react";
import "./index.css"

const RadioButtonGroup = ({ id, name, checked, handleInputChange, label }) => {
	return (
		<div id={`${id}-group`} className="radio-group">
			<input
				name={name}
				id={id}
				type="radio"
				checked={checked}
				onChange={handleInputChange}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
};

export default RadioButtonGroup;
