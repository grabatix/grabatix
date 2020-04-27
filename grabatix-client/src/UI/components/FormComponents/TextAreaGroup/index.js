import React from "react";
import PropTypes from "prop-types"
import "./index.css"

const TextAreaGroup = ({
	id,
	specialStyle,
	label,
	required = false,
	maxLength,
	minHeight = 150,
	error = "",
	placeholder,
	handleBlur = () => {},
	handleInputChange,
	value,
	disabled = false,
}) => {
    const style = { minHeight }
	return (
		<div
			id={`form-field-${id}`}
			className={`textarea-group ${specialStyle ? specialStyle : ""}`}
			style={style}
		>
			<label htmlFor={id}>
				{label}
				<span>{required ? "*" : ""}</span>
			</label>
			<textarea
				className={error ? "error" : ""}
				id={id}
				maxLength={maxLength}
				name={id}
				placeholder={placeholder}
				required={required}
				onChange={handleInputChange}
				value={value}
				aria-invalid={error ? true : false}
				onBlur={handleBlur}
				disabled={disabled}
			/>
			<div className="input-error">
				{error}
			</div>
		</div>
	);
};

TextAreaGroup.propTypes = {
	id: PropTypes.string.isRequired,
	specialStyle: PropTypes.string,
	label: PropTypes.string.isRequired,
	required: PropTypes.bool.isRequired,
	error: PropTypes.string,
	value: PropTypes.string.isRequired,
	maxLength: PropTypes.number,
	minHeight: PropTypes.number,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func,
}

export default TextAreaGroup;
