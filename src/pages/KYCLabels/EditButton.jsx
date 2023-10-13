import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const EditButton = () => (
	<Link to="/#" className="btn btn-sm btn-soft-info">
		<i className="mdi mdi-pencil-outline" id="edittooltip" />
		<UncontrolledTooltip placement="top" target="edittooltip">
			Edit
		</UncontrolledTooltip>
	</Link>
);

export default EditButton;
