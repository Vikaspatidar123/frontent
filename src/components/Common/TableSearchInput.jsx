/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Input } from 'reactstrap';

const TableSearchInput = ({ validation, placeholder }) => (
	<div className="filter-search me-2">
		<div className="position-relative">
			<Input
				type="text"
				value={validation.values.searchString}
				className="form-control border-0"
				placeholder={placeholder || 'Search...'}
				onChange={(e) =>
					validation.setFieldValue('searchString', e.target.value)
				}
			/>
			<i
				className="bx bx-search-alt search-icon"
				style={{
					position: 'absolute',
					left: '10px',
					top: '50%',
					transform: 'translateY(-50%)',
				}}
			/>

			{validation.values.searchString && (
				<i
					className="mdi mdi-close clear-icon"
					style={{
						position: 'absolute',
						right: '10px',
						top: '50%',
						transform: 'translateY(-50%)',
						cursor: 'pointer',
					}}
					onClick={() => validation.setFieldValue('searchString', '')}
				/>
			)}
		</div>
	</div>
);

export default TableSearchInput;
