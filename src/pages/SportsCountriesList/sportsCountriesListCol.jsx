import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import ImageCell from '../../components/Common/ImageCell';

const CountryId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const CountryName = ({ value }) => value ?? '';

const Icon = ({ value }) => <ImageCell imgSrc={value} />;

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

CountryId.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

Icon.propTypes = {
	value: PropTypes.string.isRequired,
};

export { CountryId, CountryName, Status, Icon };
