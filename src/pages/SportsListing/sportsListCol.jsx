import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import ImageCell from '../../components/Common/ImageCell';

const SportId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const SportName = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

const Icon = ({ value }) => (
	<ImageCell
		imgSrc={`assets/sportsbook/sports/${value?.row?.original?.providerId}.png`}
	/>
);

SportId.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

Icon.propTypes = {
	value: PropTypes.string.isRequired,
};

export { SportId, SportName, Status, Icon };
