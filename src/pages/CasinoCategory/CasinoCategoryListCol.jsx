/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GameCategoryId = ({ value }) => (
		<Link to="#" className="text-body fw-bold">
			{value ?? ''}
		</Link>
	);
const Name = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

const UpdatedAt = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

GameCategoryId.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

export { GameCategoryId, Name, CreatedAt, UpdatedAt, Status };
