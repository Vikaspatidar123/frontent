import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const { VITE_APP_AWS_GALLERY_URL } = import.meta.env;

const Pages = ({ cell }) => cell.value ?? '';

const BannerPreview = ({ cell }) => {
	const [isFits, setisFits] = useState(false);
	return (
		<>
			{isFits ? (
				<Lightbox
					mainSrc={`${VITE_APP_AWS_GALLERY_URL}/${cell.value}`} // need to be updated
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
				{cell.value ? 'Banner Preview' : ''}
			</Button>
		</>
	);
};

BannerPreview.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
	}).isRequired,
};

export { Pages, BannerPreview };
