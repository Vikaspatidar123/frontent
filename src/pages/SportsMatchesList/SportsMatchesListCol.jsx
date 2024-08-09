/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { CustomToggleButton } from '../../helpers/customForms';
import DivLoader from '../../components/Common/Loader/divLoader';

const Id = ({ value }) => value ?? '';

const Title = ({ cell }) =>
	cell.value ? (
		<Link to={`/match/${cell?.row?.original?.id}`}>{cell.value}</Link>
	) : (
		''
	);

const Tournament = ({ value }) => value ?? '-';

const Sport = ({ value }) => value ?? '';

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
						checked={cell?.value?.toString() === 'true'}
						switchSizeClass="form-switch-sm"
						onClick={(e) => toggleIsFeatured(e, cell)}
					/>
				</div>
			)}
		</>
	);
};

// const IsFeatured = ({value}) => (cell.value ? 'YES' : 'NO');

const FromDate = ({ value }) => value ?? '';

const Status = ({ value }) => {
	const status = {
		0: 'Not Started',
		1: 'In Progress',
		2: 'Finished',
		3: 'Cancelled',
		4: 'Postponed',
		5: 'Interrupted',
		6: 'Abondoned',
		7: 'Coverage Lost',
	};
	return status[value] || '';
};

// const Live = ({ value }) => (value ? 'YES' : 'NO');

IsFeatured.propTypes = {
	cell: PropTypes.oneOfType([PropTypes.object]),
	toggleIsFeatured: PropTypes.func,
};

IsFeatured.defaultProps = {
	cell: PropTypes.oneOfType([PropTypes.object]),
	toggleIsFeatured: PropTypes.func,
};
export {
	Id,
	Title,
	Tournament,
	Sport,
	IsFeatured,
	FromDate,
	Status,
	// Live,
};
export default IsFeatured;
