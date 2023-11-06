/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ onClickEdit, onClickDelete, cell }) => {
	const key = cell?.row?.original?.key;
	return (
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

			<li>
				<Link
					to="#"
					className="btn btn-sm btn-soft-danger"
					onClick={(e) => {
						e.preventDefault();
						onClickDelete(key);
					}}
				>
					<i
						className="mdi mdi-delete-outline"
						id={`delete-${cell?.row?.id}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`delete-${cell?.row?.id}`}
					>
						Delete
					</UncontrolledTooltip>
				</Link>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
