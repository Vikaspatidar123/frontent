/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GameSubCategoryId = (cell) => (
		<Link to="/#" className="text-body fw-bold">
			{cell.value ? cell.value : ''}
		</Link>
	);

const Name = (cell) => cell.value ? cell.value : '';

const GameCategory = (cell) => cell.value ? cell.value : '';

const ImageUrl = (cell) => cell.value ? cell.value : '';

const Status = ({ cell }) =>
	cell.value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">Close</Badge>
	);

GameSubCategoryId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool.isRequired,
	}).isRequired,
};

export { GameSubCategoryId, Name, GameCategory, ImageUrl, Status };
