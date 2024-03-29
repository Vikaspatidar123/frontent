/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { modules } from '../../constants/permissions';
import usePermission from '../../components/Common/Hooks/usePermission';
import { updateSAUserStatus } from '../../store/actions';
import { useDispatch } from 'react-redux';

const PlayerId = ({ value }) => value ?? '';

const UserName = ({ cell }) =>
	cell.value ? (
		<Link to={`/player-details/${cell?.row?.original?.id}`}>{cell.value}</Link>
	) : (
		''
	);

const Email = ({ value }) => value ?? '';

const PhoneNumber = ({ value }) => value ?? '-';

const KycStatus = ({ value }) => value ?? '';

const IsInternal = ({ value }) => value ?? '';

const Action = ({ cell }) => {
	const active = cell?.row?.original?.isActive;
	const userId = cell?.row?.original?.id;
	const { isGranted } = usePermission();
	const dispatch = useDispatch();
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top">
				<Link
					to={`/player-details/${userId}`}
					className="btn btn-sm btn-soft-primary"
					hidden={!isGranted(modules.player, 'U')}
				>
					<i className="mdi mdi-pencil-outline" id={`eye-tooltip-${userId}`} />
				</Link>
			</li>
			<UncontrolledTooltip placement="top" target={`eye-tooltip-${userId}`}>
				Edit
			</UncontrolledTooltip>

			{isGranted(modules.player, 'TS') && (
				<li>
					{active ? (
						<Link
							className="btn btn-sm btn-soft-danger"
							onClick={() =>
								dispatch(
									updateSAUserStatus({
										userId,
										pageType: 'PlayerListing',
									})
								)
							}
						>
							<i
								className="mdi mdi-close-thick"
								id={`active-tooltip-${userId}`}
							/>
							<UncontrolledTooltip
								placement="top"
								target={`active-tooltip-${userId}`}
							>
								Set Inactive
							</UncontrolledTooltip>
						</Link>
					) : (
						<Link
							className="btn btn-sm btn-soft-success"
							onClick={() =>
								dispatch(
									updateSAUserStatus({
										userId,
										pageType: 'PlayerListing',
									})
								)
							}
						>
							<i
								className="mdi mdi-check-circle"
								id={`active-tooltip-${userId}`}
							/>
							<UncontrolledTooltip
								placement="top"
								target={`active-tooltip-${userId}`}
							>
								Set Active
							</UncontrolledTooltip>
						</Link>
					)}
				</li>
			)}
		</ul>
	);
};
const Status = ({ value }) => {
	switch (value) {
		case 'Active':
			return <Badge className="bg-success">Active</Badge>;
		case 'In-Active':
			return <Badge className="bg-danger">In-Active</Badge>;
		default:
			return '';
	}
};

UserName.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				id: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

Action.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				id: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

Status.propTypes = {
	value: PropTypes.string.isRequired,
};

export {
	IsInternal,
	KycStatus,
	PhoneNumber,
	UserName,
	PlayerId,
	Email,
	Action,
	Status,
};
