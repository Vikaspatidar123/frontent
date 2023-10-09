import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BonusId = ({ cell }) => (
	<Link to="/" className="text-body fw-bold">
		{cell.value ?? ''}
	</Link>
);
const Title = ({ cell }) => cell.value ?? '';

const BonusType = ({ cell }) => cell.value ?? '';

const ValidTill = ({ cell }) => cell.value ?? '';

const IsExpired = ({ cell }) => cell.value ?? '';

const IsClaimed = ({ cell }) => cell.value ?? '';

const Status = ({ cell }) =>
	cell.value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">Close</Badge>
	);

BonusId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.number.isRequired,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool.isRequired,
	}).isRequired,
};

export { BonusId, Title, BonusType, ValidTill, IsExpired, IsClaimed, Status };
