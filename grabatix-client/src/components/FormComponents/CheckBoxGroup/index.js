import React from "react";
import "./index.css"

const CheckBoxGroup = ({ id, checked, handleInputChange, label }) => {
	return (
		<div className="checkbox-group">
			<input
				type="checkbox"
				id={id}
				name={id}
				checked={checked}
				onChange={handleInputChange}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
}

export default CheckBoxGroup;