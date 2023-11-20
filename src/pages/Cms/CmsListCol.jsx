import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const CmsPageId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const Title = ({ value }) => value ?? '';

const Slug = ({ value }) => value ?? '';

const Portal = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

CmsPageId.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.string.isRequired,
};

export { CmsPageId, Title, Portal, Slug, Status };
