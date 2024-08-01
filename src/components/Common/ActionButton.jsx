/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'reactstrap';

const ActionButton = ({ onClick, iconClass, children, className }) => (
	<Button className={`fancy-btn ${className}`} onClick={onClick}>
		<i className={`${iconClass}`} /> {children}
	</Button>
);

export default ActionButton;
