/* eslint-disable react/prop-types */
import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BonusId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);
const Title = ({ value }) => value ?? '';

const BonusType = ({ value }) => value ?? '';
const ValidTill = ({ value }) => value ?? '';

const IsExpired = ({ value }) => value ?? '';

const IsClaimed = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">Close</Badge>
	);

const ActionButtons = () => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
			<Link to="/" className="btn btn-sm btn-soft-primary">
				<i className="mdi mdi-eye-outline" id="viewtooltip" />
			</Link>
		</li>
		<UncontrolledTooltip placement="top" target="viewtooltip">
			View
		</UncontrolledTooltip>

		<li>
			<Link to="/" className="btn btn-sm btn-soft-info">
				<i className="mdi mdi-pencil-outline" id="edittooltip" />
				<UncontrolledTooltip placement="top" target="edittooltip">
					Edit
				</UncontrolledTooltip>
			</Link>
		</li>

		<li>
			<Link to="/" className="btn btn-sm btn-soft-danger">
				<i className="mdi mdi-delete-outline" id="deletetooltip" />
				<UncontrolledTooltip placement="top" target="deletetooltip">
					Delete
				</UncontrolledTooltip>
			</Link>
		</li>
	</ul>
);

BonusId.propTypes = {
	value: PropTypes.number.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

export {
	BonusId,
	Title,
	BonusType,
	ValidTill,
	IsExpired,
	IsClaimed,
	Status,
	ActionButtons,
};
