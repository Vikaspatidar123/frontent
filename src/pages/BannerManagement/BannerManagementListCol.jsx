import React from 'react';
import PropTypes from 'prop-types';

import 'react-image-lightbox/style.css';
import ImageCell from '../../components/Common/ImageCell';

const { VITE_APP_AWS_GALLERY_URL } = import.meta.env;

const Pages = ({ value }) => value ?? '';

const BannerPreview = ({ value }) => (
	<ImageCell imgSrc={`${VITE_APP_AWS_GALLERY_URL}/${value}`} />
);

BannerPreview.propTypes = {
	value: PropTypes.string.isRequired,
};

export { Pages, BannerPreview };
