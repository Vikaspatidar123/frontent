/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const GameSubCategoryId = (cell) => (
	<Link to="/#" className="text-body fw-bold">
		{cell.value ? cell.value : ''}
	</Link>
);

const Name = (cell) => (cell.value ? cell.value : '');

const GameCategory = (cell) => (cell.value ? cell.value : '');

const ImageUrl = ({ cell }) => {
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
				View Image
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

GameSubCategoryId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool.isRequired,
	}).isRequired,
};

ImageUrl.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string,
	}).isRequired,
};

export { GameSubCategoryId, Name, GameCategory, ImageUrl, Status };
