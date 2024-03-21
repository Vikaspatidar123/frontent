import React from 'react';
import PropTypes from 'prop-types';

import 'react-image-lightbox/style.css';
import ImageCell from '../../components/Common/ImageCell';

const Pages = ({ value }) => value?.toUpperCase() ?? '';

const Id = ({ value }) => value ?? '';

const BannerPreview = ({ value }) => <ImageCell imgSrc={value} />;

BannerPreview.propTypes = {
	value: PropTypes.string.isRequired,
};

export { Pages, BannerPreview, Id };
