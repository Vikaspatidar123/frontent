/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ onClickEdit, cell }) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li>
			<Link
				to="#"
				onClick={(e) => {
					e.preventDefault();
					onClickEdit(cell?.row?.original);
				}}
				className="btn btn-sm btn-soft-info"
			>
				<i className="mdi mdi-pencil-outline" id={`edit-${cell?.row?.id}`} />
				<UncontrolledTooltip placement="top" target={`edit-${cell?.row?.id}`}>
					Edit
				</UncontrolledTooltip>
			</Link>
		</li>

		{/* <li>
			<Link to="/" className="btn btn-sm btn-soft-danger">
				<i className="mdi mdi-delete-outline" id="deletetooltip" />
				<UncontrolledTooltip placement="top" target="deletetooltip">
					Delete
				</UncontrolledTooltip>
			</Link>
		</li> */}
	</ul>
);

ActionButtons.propTypes = {
	onClickEdit: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
