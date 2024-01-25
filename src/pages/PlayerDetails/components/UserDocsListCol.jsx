import React from 'react';
import PropTypes from 'prop-types';
import ImageCell from '../../../components/Common/ImageCell';

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
const ActionAt = ({ value }) => value ?? '';
const Status = ({ value }) => (value ? statusMapper(value) : '-');
const Action = ({ value }) => (value ? statusMapper(value) : '-');

const ThumbnailUrl = ({ value }) => <ImageCell imgSrc={value} />;

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
