/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CommentActionButtons = ({ cell, handleUpdate, handleDelete }) => {
	const commentId = cell?.row?.original?.id;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Link
					to="#"
					className="btn btn-sm btn-soft-info btn-primary"
					onClick={(e) => {
						e.preventDefault();
						handleUpdate(cell?.row?.original);
					}}
				>
					<i
						className="mdi mdi-pencil-outline"
						id={`edittooltip-${commentId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`edittooltip-${commentId}`}
					>
						Edit Comment
					</UncontrolledTooltip>
				</Link>
			</li>

			<li>
				<Link
					to="#"
					className="btn btn-sm btn-soft-danger btn-primary"
					onClick={(e) => {
						e.preventDefault();
						handleDelete(commentId);
					}}
				>
					<i
						className="mdi mdi-delete-outline"
						id={`deletetooltip-${commentId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`deletetooltip-${commentId}`}
					>
						Delete Comment
					</UncontrolledTooltip>
				</Link>
			</li>
		</ul>
	);
};

CommentActionButtons.propTypes = {
	handleUpdate: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default CommentActionButtons;
