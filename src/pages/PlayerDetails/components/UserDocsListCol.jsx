/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { Button } from 'reactstrap';

const statusMapper = (value) => {
	switch (value) {
		case 0:
			return 'Pending';
		case 1:
			return 'Approved';
		case 4:
			return 'Re-requested';
		default:
			return 'Rejected';
	}
};

const Id = (cell) => (cell.value ? cell.value : '');
const Name = (cell) => (cell.value ? cell.value : '');
const Reason = (cell) => (cell.value ? cell.value : 'NA');
const UpdatedAt = (cell) => (cell.value ? cell.value : '');
const Actionee = (cell) => (cell.value ? cell.value : 'NA');
const ActionAt = (cell) => (cell.value ? cell.value : 'NA');
const Status = (cell) => (cell.value ? statusMapper(cell.value) : 'NA');
const Action = (cell) => (cell.value ? statusMapper(cell.value) : 'NA');

const ThumbnailUrl = ({ cell }) => {
	const [isFits, setisFits] = useState(false);
	return (
		<>
			{isFits ? (
				<Lightbox
					mainSrc={cell.value}
					enableZoom={false}
					onCloseRequest={() => {
						setisFits(!isFits);
					}}
				/>
			) : null}

			<Button
				color="link"
				className="btn btn-link waves-effect"
				onClick={() => setisFits(true)}
			>
				{cell.value ? 'View Here' : ''}
			</Button>
		</>
	);
};

export {
	Id,
	Name,
	Reason,
	UpdatedAt,
	Actionee,
	ActionAt,
	Status,
	Action,
	ThumbnailUrl,
};
