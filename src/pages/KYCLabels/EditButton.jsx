/* eslint-disable react/prop-types */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const EditButton = ({ handleClick, label }) => (
	<Link
		to="/#"
		onClick={(e) => handleClick(e, label)}
		className="btn btn-sm btn-soft-info"
	>
		<i className="mdi mdi-pencil-outline" id="edittooltip" />
		<UncontrolledTooltip placement="top" target="edittooltip">
			Edit
		</UncontrolledTooltip>
	</Link>
);

export default EditButton;
