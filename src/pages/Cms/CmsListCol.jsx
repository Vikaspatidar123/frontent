import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CmsPageId = ({ cell }) => (
	<Link to="/" className="text-body fw-bold">
		{cell.value ?? ''}
	</Link>
);

const Title = ({ cell }) => cell.value ?? '';

const Slug = ({ cell }) => cell.value ?? '';

const Portal = ({ cell }) => cell.value ?? '';

const Status = ({ cell }) =>
	cell.value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">Close</Badge>
	);

CmsPageId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.number.isRequired,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool.isRequired,
	}).isRequired,
};

export { CmsPageId, Title, Portal, Slug, Status };
