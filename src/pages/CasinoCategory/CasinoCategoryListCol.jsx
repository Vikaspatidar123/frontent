/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GameCategoryId = (cell) => {
	const { value = '' } = cell;
	return (
		<Link to="#" className="text-body fw-bold">
			{value || ''}
		</Link>
	);
};
const Email = (cell) => (cell.value ? cell.value : '');

const CreatedAt = (cell) => (cell.value ? cell.value : '');

const UpdatedAt = (cell) => (cell.value ? cell.value : '');

const Status = ({ cell }) =>
	cell.value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

GameCategoryId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool.isRequired,
	}).isRequired,
};

export { GameCategoryId, Email, CreatedAt, UpdatedAt, Status };
