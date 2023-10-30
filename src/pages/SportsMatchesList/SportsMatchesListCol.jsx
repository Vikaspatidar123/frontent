/* eslint-disable react/jsx-no-useless-fragment */

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { CustomToggleButton } from '../../helpers/customForms';
import DivLoader from '../../components/Common/Loader/divLoader';

const Id = (cell) => (cell.value ? cell.value : '');

const Title = (cell) => (cell.value ? cell.value : '');

const Tournament = (cell) => (cell.value ? cell.value : '-');

const Sport = (cell) => (cell.value ? cell.value : '');

const IsFeatured = ({ cell, toggleIsFeatured }) => {
	const { isFeaturedUpdateLoading, featuredFabData } = useSelector(
		(state) => state.SportsMatches
	);
	return (
		<>
			{isFeaturedUpdateLoading &&
			featuredFabData?.providerMatchId ===
				cell?.row?.original.providerMatchId ? (
				<DivLoader isWithoutPadding />
			) : (
				<div className="form-check-success d-flex justify-content-center">
					<CustomToggleButton
						containerClass="false"
						type="checkbox"
						className="form-check-input"
						checked={cell.value.toString() === 'true'}
						switchSizeClass="form-switch-sm"
						onClick={(e) => toggleIsFeatured(e, cell)}
					/>
				</div>
			)}
		</>
	);
};

// const IsFeatured = (cell) => (cell.value ? 'YES' : 'NO');

const StartDate = (cell) => (cell.value ? cell.value : '');

const Status = (cell) => (cell.value ? cell.value : '');

const Live = (cell) => (cell.value ? 'YES' : 'NO');

IsFeatured.propTypes = {
	cell: PropTypes.oneOfType([PropTypes.object]),
	toggleIsFeatured: PropTypes.func,
};

IsFeatured.defaultProps = {
	cell: PropTypes.oneOfType([PropTypes.object]),
	toggleIsFeatured: PropTypes.func,
};
export { Id, Title, Tournament, Sport, IsFeatured, StartDate, Status, Live };
export default IsFeatured;
