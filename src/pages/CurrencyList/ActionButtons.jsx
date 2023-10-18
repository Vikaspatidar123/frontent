/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const ActionButtons = () => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li>
			<Link
				to="#"
				className="btn btn-sm btn-soft-info"
				// onClick={(e) => handleEdit(e, cell?.row?.original)}
			>
				<i className="mdi mdi-pencil-outline" id="edittooltip" />
				<UncontrolledTooltip placement="top" target="edittooltip">
					Edit
				</UncontrolledTooltip>
			</Link>
		</li>
	</ul>
);

export default ActionButtons;
