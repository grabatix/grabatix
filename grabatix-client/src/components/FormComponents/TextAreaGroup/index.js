import React from "react";
import "./index.css"

const TextAreaGroup = ({
	id,
	specialStyle,
	label,
	required,
	maxLength,
	minHeight = 150,
	error,
	placeholder,
	handleBlur = () => {},
	handleInputChange,
	value,
	disabled,
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

export default TextAreaGroup;
