import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const { VITE_APP_AWS_GALLERY_URL } = import.meta.env;

const Pages = ({ value }) => value ?? '';

const BannerPreview = ({ value }) => {
	const [isFits, setIsFits] = useState(false);
	return (
		<>
			{isFits ? (
				<Lightbox
					mainSrc={`${VITE_APP_AWS_GALLERY_URL}/${value}`} // need to be updated
					enableZoom={false}
					onCloseRequest={() => {
						setIsFits(!isFits);
					}}
				/>
			) : null}

			<Button
				color="link"
				className="btn btn-link waves-effect"
				onClick={() => setIsFits(true)}
			>
				{value ? 'Preview' : ''}
			</Button>
		</>
	);
};

BannerPreview.propTypes = {
	value: PropTypes.string.isRequired,
};

export { Pages, BannerPreview };
