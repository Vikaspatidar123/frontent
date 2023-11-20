import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

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

const Id = ({ value }) => value ?? '';
const Name = ({ value }) => value ?? '';
const Reason = ({ value }) => value ?? '-';
const UpdatedAt = ({ value }) => value ?? '';
const Actionee = ({ value }) => value ?? '-';
const ActionAt = ({ value }) => value ?? '-';
const Status = ({ value }) => (value ? statusMapper(value) : '-');
const Action = ({ value }) => (value ? statusMapper(value) : '-');

const ThumbnailUrl = ({ value }) => {
	const [isFits, setisFits] = useState(false);
	return (
		<>
			{isFits ? (
				<Lightbox
					mainSrc={value}
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
				{value ? 'View Here' : ''}
			</Button>
		</>
	);
};

ThumbnailUrl.propTypes = {
	value: PropTypes.string.isRequired,
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
