import React from "react";
import PropTypes from "prop-types"
import './index.css'

const InputGroup = ({
	id,
	specialStyle = "",
	label,
	required = false,
	error,
	value,
	type,
	maxLength,
	placeholder,
	disabled = false,
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

InputGroup.propTypes = {
	id: PropTypes.string.isRequired,
	specialStyle: PropTypes.string,
	label: PropTypes.string.isRequired,
	required: PropTypes.bool.isRequired,
	error: PropTypes.string,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	maxLength: PropTypes.number,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	validation: PropTypes.string,
	handleInputChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func,
	inputMode: PropTypes.string,
}

export default InputGroup;