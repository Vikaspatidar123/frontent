import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import { dateFormat, selectedLanguage } from '../../constants/config';

const BonusId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);
const Title = ({ value }) => value[selectedLanguage] ?? '-';

const BonusType = ({ value }) => value ?? '';

const Date = ({ value }) => (value ? moment(value).format(dateFormat) : '-');

const Custom = ({ value }) => value ?? '';

const IsClaimed = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

BonusId.propTypes = {
	value: PropTypes.number.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

export { BonusId, Title, BonusType, Date, Custom, IsClaimed, Status };
