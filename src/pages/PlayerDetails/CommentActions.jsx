/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CommentActionButtons = ({ cell, handleStatus }) => {
	const status = cell?.row?.original?.status;
	const commentId = cell?.row?.original?.commentId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				{status === '1' ? (
					<Link
						to="#"
						className="btn btn-sm btn-soft-success"
						onClick={(e) => {
							e.preventDefault();
							handleStatus({});
						}}
					>
						<i
							className="mdi mdi-check-circle"
							id={`inactivetooltip-${commentId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`inactivetooltip-${commentId}`}
						>
							Mark As Not Required
						</UncontrolledTooltip>
					</Link>
				) : (
					status === '4' && (
						<Link
							to="#"
							className="btn btn-sm btn-soft-danger"
							onClick={(e) => {
								e.preventDefault();
								handleStatus({
									commentId,
									isActive: false,
								});
							}}
						>
							<i
								className="mdi mdi-close-thick"
								id={`activetooltip-${commentId}`}
							/>
							<UncontrolledTooltip
								placement="top"
								target={`activetooltip-${commentId}`}
							>
								Resolve
							</UncontrolledTooltip>
						</Link>
					)
				)}
			</li>
		</ul>
	);
};

CommentActionButtons.propTypes = {
	handleStatus: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default CommentActionButtons;
