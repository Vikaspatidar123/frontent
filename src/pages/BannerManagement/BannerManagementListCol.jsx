import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const { VITE_APP_AWS_GALLERY_URL } = import.meta.env;

const Pages = ({ cell }) => cell.value ?? '';

const BannerPreview = ({ cell }) => (
	<Link
		to={`${VITE_APP_AWS_GALLERY_URL}${cell.value}`}
		className="text-body fw-bold"
	>
		{cell.value ? 'Banner Preview' : ''}
	</Link>
);

BannerPreview.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
	}).isRequired,
};

export { Pages, BannerPreview };
