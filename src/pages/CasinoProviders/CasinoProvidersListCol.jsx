import React, { useState } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const CasinoProviderId = ({ value }) => (
	<Link to="/#" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);
const Name = ({ value }) => value ?? '';

const ThumbnailUrl = ({ value }) => {
	const [isFits, setIsFits] = useState(false);
	return (
		<>
			{isFits ? (
				<Lightbox
					mainSrc={value}
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
				{value ? 'View Here' : ''}
			</Button>
		</>
	);
};

const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

CasinoProviderId.propTypes = {
	value: PropTypes.number.isRequired,
};

ThumbnailUrl.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

export { CasinoProviderId, Name, ThumbnailUrl, Status };
