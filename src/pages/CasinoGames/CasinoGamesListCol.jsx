import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CasinoGameId = ({ cell }) => (
	<Link to="/#" className="text-body fw-bold">
		{cell.value ?? ''}
	</Link>
);
const Name = ({ cell }) => cell.value ?? '';

const Provider = ({ cell }) => cell.value ?? '';

const RTP = ({ cell }) => cell.value ?? '';

const SubCategory = ({ cell }) => cell.value ?? '';

const ThumbnailUrl = ({ cell }) => (
	<Link to={cell.value} className="text-body fw-bold">
		{cell.value ? 'View Here' : ''}
	</Link>
);
const DeviceType = ({ cell }) => cell.value ?? '';

const Status = ({ cell }) =>
	cell.value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">Close</Badge>
	);

CasinoGameId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.number.isRequired,
	}).isRequired,
};

ThumbnailUrl.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool.isRequired,
	}).isRequired,
};

export {
	CasinoGameId,
	Name,
	Provider,
	RTP,
	SubCategory,
	ThumbnailUrl,
	DeviceType,
	Status,
};
