/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({
	row: { original },
	handleStatus,
	onClickEdit,
	handleDeleteItem,
}) => {
	const { isGranted } = usePermission();
	const active = original?.isActive;
	const casinoGameId = original?.casinoGameId;
	const isDisabled = !!original?.parentId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top">
				{isGranted(modules.CasinoManagement, 'U') && (
					<Link
						to={`/casino-games/restrict-countries/${casinoGameId}`}
						state={{ type: 'games' }}
						className="btn btn-sm btn-soft-primary"
					>
						<i
							className="mdi mdi-block-helper"
							id={`viewtooltip-${casinoGameId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`viewtooltip-${casinoGameId}`}
						>
							View Restricted Countries
						</UncontrolledTooltip>
					</Link>
				)}
			</li>

			<li>
				{active ? (
					<Button
						type="button"
						hidden={!isGranted(modules.CasinoManagement, 'T')}
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
							id={`activetooltip-${casinoGameId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`activetooltip-${casinoGameId}`}
						>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						type="button"
						hidden={!isGranted(modules.CasinoManagement, 'T')}
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
					hidden={!isGranted(modules.CasinoManagement, 'U')}
					className="btn btn-sm btn-soft-info"
					onClick={(e) => {
						e.preventDefault();
						onClickEdit(original);
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
					hidden={!isGranted(modules.CasinoManagement, 'D')}
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
	original: PropTypes.objectOf.isRequired,
	handleStatus: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	handleDeleteItem: PropTypes.func.isRequired,
};

export default ActionButtons;
