import React from "react";
import './index.css'

const InputGroup = ({
	id,
	specialStyle = "",
	label,
	required,
	error,
	value,
	type,
	maxLength,
	placeholder,
	disabled,
	validation,
	handleInputChange,
	handleBlur = () => {},
	inputMode = "text",
}) => {
	return (
		<div
			id={`form-field-${id}`}
			className={`form-group ${specialStyle ? specialStyle : ""}`}
		>
			<label htmlFor={id}>
				{label}
				<span>{required ? "*" : ""}</span>
			</label>
			<input
				className={error ? "error" : ""}
				type={type}
				id={id}
				maxLength={maxLength}
				name={id}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={handleInputChange}
				onBlur={handleBlur}
				aria-invalid={error ? true : false}
				disabled={disabled}
				pattern={validation ? validation : ".*"}
				inputMode={inputMode}
			/>
			<div className="input-error">
				{error}
			</div>
		</div>
	);
};

export default InputGroup;