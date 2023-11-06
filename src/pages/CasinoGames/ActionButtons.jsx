/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ActionButtons = ({
	cell,
	handleStatus,
	onClickEdit,
	handleDeleteItem,
}) => {
	const active = cell?.row?.original?.isActive;
	const casinoGameId = cell?.row?.original?.casinoGameId;
	const isDisabled = !!cell?.row?.original?.parentId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Button type="button" className="btn btn-sm btn-soft-primary">
					<i
						className="mdi mdi-eye-outline"
						id={`viewtooltip-${casinoGameId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`viewtooltip-${casinoGameId}`}
					>
						View
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				{active ? (
					<Button
						type="button"
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								active,
								casinoGameId,
							})
						}
					>
						<i
							className="mdi mdi-close-thick"
							id={`inactivetooltip-${casinoGameId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`inactivetooltip-${casinoGameId}`}
						>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						type="button"
						className="btn btn-sm btn-soft-success"
						onClick={(e) =>
							handleStatus(e, {
								active,
								casinoGameId,
							})
						}
					>
						<i
							className="mdi mdi-check-circle"
							id={`activetooltip-${casinoGameId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`activetooltip-${casinoGameId}`}
						>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>

			<li>
				<Button
					type="button"
					className="btn btn-sm btn-soft-info"
					onClick={(e) => {
						e.preventDefault();
						onClickEdit(cell?.row?.original);
					}}
				>
					<i
						className="mdi mdi-pencil-outline"
						id={`edittooltip-${casinoGameId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`edittooltip-${casinoGameId}`}
					>
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					type="button"
					disabled={!isDisabled}
					className="btn btn-sm btn-soft-danger"
					onClick={(e) => {
						e.preventDefault();
						handleDeleteItem(casinoGameId);
					}}
				>
					<i
						className="mdi mdi-delete-outline"
						id={`deletetooltip-${casinoGameId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`deletetooltip-${casinoGameId}`}
					>
						Delete
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.prototype = {
	cell: PropTypes.objectOf.isRequired,
	handleStatus: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	handleDeleteItem: PropTypes.func.isRequired,
};

export default ActionButtons;
