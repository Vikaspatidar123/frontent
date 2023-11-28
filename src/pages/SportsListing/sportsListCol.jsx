import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';

const SportId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const SportName = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

const Icon = ({ value }) => {
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
				{value ? 'Icon Preview' : ''}
			</Button>
		</>
	);
};

SportId.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

Icon.propTypes = {
	value: PropTypes.string.isRequired,
};

export { SportId, SportName, Status, Icon };
