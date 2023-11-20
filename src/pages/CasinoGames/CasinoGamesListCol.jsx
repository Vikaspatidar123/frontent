/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { Button, Badge } from 'reactstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import DivLoader from '../../components/Common/Loader/divLoader';
import { CustomToggleButton } from '../../helpers/customForms';

const CasinoGameId = ({ value }) => (
	<Link to="/#" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);
const Name = ({ value }) => value ?? '';

const Provider = ({ value }) => value ?? '';

const Rtp = ({ value }) => value ?? '';

const SubCategory = ({ value }) => value ?? '';

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
const DeviceType = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

CasinoGameId.propTypes = {
	value: PropTypes.number.isRequired,
};

ThumbnailUrl.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

const IsFeatured = ({ cellProps, toggleIsFeaturedGames }) => {
	const { isFeaturedLoading, featuredGameData } = useSelector(
		(state) => state.CasinoManagementData
	);
	return (
		<>
			{isFeaturedLoading &&
			Number(featuredGameData?.casinoGameId) ===
				Number(cellProps?.row?.original.casinoGameId) ? (
				<DivLoader isWithoutPadding />
			) : (
				<div className="form-check-success d-flex justify-content-center">
					<CustomToggleButton
						containerClass="false"
						type="checkbox"
						className="form-check-input"
						checked={cellProps?.value?.toString() === 'true'}
						switchSizeClass="form-switch-sm"
						onClick={(e) => toggleIsFeaturedGames(e, cellProps)}
					/>
				</div>
			)}
		</>
	);
};
IsFeatured.propTypes = {
	cellProps: PropTypes.oneOfType([PropTypes.object]),
	toggleIsFeaturedGames: PropTypes.func,
};

IsFeatured.defaultProps = {
	cellProps: PropTypes.oneOfType([PropTypes.object]),
	toggleIsFeaturedGames: PropTypes.func,
};

export {
	CasinoGameId,
	Name,
	Provider,
	Rtp,
	SubCategory,
	ThumbnailUrl,
	DeviceType,
	Status,
	IsFeatured,
};
