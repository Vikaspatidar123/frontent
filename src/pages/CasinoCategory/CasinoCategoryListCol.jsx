/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

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

const IsActive = (cell) => (cell.value ? 'Active' : 'In-Active');

export { GameCategoryId, Email, CreatedAt, UpdatedAt, IsActive };
