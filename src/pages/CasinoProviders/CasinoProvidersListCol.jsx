import React, { useState } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const CasinoProviderId = ({ cell }) => (
	<Link to="/#" className="text-body fw-bold">
		{cell.value ?? ''}
	</Link>
);
const Name = ({ cell }) => cell.value ?? '';

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

const Status = ({ cell }) =>
	cell.value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

CasinoProviderId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.number.isRequired,
	}).isRequired,
};

ThumbnailUrl.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool.isRequired,
	}).isRequired,
};

export { CasinoProviderId, Name, ThumbnailUrl, Status };
