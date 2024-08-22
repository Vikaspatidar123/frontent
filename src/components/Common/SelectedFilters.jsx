/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Badge, Button } from 'reactstrap';

const SelectedFilters = ({
	validation,
	filterFormatter,
	handleResetCallback,
}) => {
	const clearFilter = (filterName) => {
		validation.setFieldValue(filterName, '');
	};
	const hasFilters = Object.keys(validation.values || {}).some(
		(value) => validation.values[value]
	);

	return (
		<div className={`${hasFilters ? 'm-2' : 'm-0'}`}>
			{Object.keys(validation.values || {}).map((filterName) => {
				if (validation.values[filterName]) {
					return (
						<Badge
							key={filterName}
							className="me-2 p-2 bg-light fs-6"
							style={{ cursor: 'pointer' }}
						>
							{filterFormatter
								? filterFormatter(filterName, validation.values[filterName])
								: `${filterName}: ${validation.values[filterName]}`}
							<i
								className="mdi mdi-close ms-1"
								onClick={() => clearFilter(filterName)}
							/>
						</Badge>
					);
				}
				return null;
			})}
			{hasFilters ? (
				<Button
					color="link"
					className="btn btn-link waves-effect"
					onClick={() => {
						if (handleResetCallback) {
							handleResetCallback();
						} else {
							validation.resetForm();
						}
					}}
				>
					Clear all
				</Button>
			) : null}
		</div>
	);
};

export default SelectedFilters;
