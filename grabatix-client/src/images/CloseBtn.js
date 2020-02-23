import React from "react";
import PropTypes from 'prop-types'

const CloseBtn = ({handleClick}) => (
	<svg
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 24 24"
		height="20px"
		width="20px"
		xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 15, right: 15, cursor: "pointer" }}
        onClick={handleClick}
	>
		<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
	</svg>
);

CloseBtn.propTypes = {
    handleClick: PropTypes.func.isRequired
}

export default CloseBtn;
