import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'react-image-lightbox/style.css';
import ImageCell from '../../components/Common/ImageCell';
import { selectedLanguage } from '../../constants/config';

const CasinoGameId = ({ value }) => (
	<Link to="/#" className="text-body">
		{value ?? ''}
	</Link>
);

const DeviceType = ({ value }) => value ?? '';

const GameSubCategoryId = ({ value }) => (
	<Link to="/#" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const Name = ({ value }) => value[selectedLanguage] ?? '';

const GameCategory = ({ value }) => value ?? '';

const ImageUrl = ({ value }) => <ImageCell imgSrc={value} />;

const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

GameSubCategoryId.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

ImageUrl.propTypes = {
	value: PropTypes.string.isRequired,
};

GameCategory.propTypes = {
	value: PropTypes.string.isRequired,
};

Name.propTypes = {
	value: PropTypes.string.isRequired,
};

DeviceType.propTypes = {
	value: PropTypes.string.isRequired,
};

CasinoGameId.propTypes = {
	value: PropTypes.string.isRequired,
};

export {
	GameSubCategoryId,
	Name,
	GameCategory,
	ImageUrl,
	Status,
	DeviceType,
	CasinoGameId,
};
